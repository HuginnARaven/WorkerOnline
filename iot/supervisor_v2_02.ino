#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <EEPROM.h>


ESP8266WebServer server(80);

const uint8_t redPin = D1;
const uint8_t greenPin = D2;
const uint8_t bluePin = D3;

const int buttonPin = D7;

const int trigPin = D5; 
const int echoPin = D6;

const char* ssid = "";
const char* password = "";

String serverAddress = "";
String serial_number = "";

bool is_root = false;
bool in_admin_mode = false;
String options = "";

long duration;
int distance;
bool presence = false;
int presence_count = 0;
String day_start = "";
String day_end = "";

void rgb (unsigned char red, unsigned char green, unsigned char blue){    
  analogWrite(redPin, red);   
  analogWrite(bluePin, blue); 
  analogWrite(greenPin, green); 
}

void setup() {
  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  rgb(0, 0, 0);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  pinMode(buttonPin, INPUT);
  if (digitalRead(buttonPin) == HIGH){
    is_root = true;
    Serial.println("Root button detected!");
  }

  Serial.println("Welcome to the supervisor dispaly terminal!");

  EEPROM.begin(sizeof(struct settings));
  EEPROM.get( 0, iot_settings );

  WiFi.mode(WIFI_STA);
  WiFi.begin(iot_settings.ssid, iot_settings.password);
  byte tries = 0;
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Trying to connect to wifi! Attept #");Serial.println(tries+1);    
    delay(1000);
    if (tries++ > 8) {
      Serial.println("Failed to connect to wifi! Starting connection tools...");       
      WiFi.mode(WIFI_AP);
      WiFi.softAP("WorkerOnline_iot", "12345678");
      server.on("/",  handlePortal);
      break;
    }
  }

  if (WiFi.status() == WL_CONNECTED ) {
    Serial.println("Wifi connection success!");
  }

  serverAddress = iot_settings.domen;
  serial_number = iot_settings.serial_number;

  Serial.println("Device settings");
  Serial.println("_____________________");
  Serial.println(iot_settings.ssid);
  Serial.println(iot_settings.password);
  Serial.println(serverAddress);
  Serial.println(serial_number);
  Serial.println("_____________________");
  server.begin();

  if (WiFi.status() == WL_CONNECTED) {
    server.handleClient();
    if (activityRequest() != "error"){
      options = getOptions();
      String modeValue = getValueFromJsonString(options, "in_admin_mode");
      modeValue = getValueFromJsonString(options, "in_admin_mode");
      day_start = getValueFromJsonString(options, "day_start");
      day_end = getValueFromJsonString(options, "day_end");
      if (modeValue == "true") {
        Serial.println("Admin mode");
        rgb(0, 0, 255);
        in_admin_mode = true;
        WiFi.softAP("WorkerOnline_root", "12345678");
        server.on("/",  handleRoot);
      }
    } else if (activityRequest() == "error" && is_root) {
        Serial.println("Admin mode");
        rgb(0, 0, 255);
        in_admin_mode = true;
        WiFi.softAP("WorkerOnline_root", "12345678");
        server.on("/",  handleRoot);
    } else{
        Serial.println("General mode");
    }
  }
}

void loop() {
  server.handleClient();
  if (WiFi.status() == WL_CONNECTED && !in_admin_mode) {
    rgb(0, 0, 0);
    checkServerConnectionAndSendActivity();
    
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);

    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);

    duration = pulseIn(echoPin, HIGH);
    presence = is_present(duration, presence);

    delay(5000);
  }
}

bool is_present(long duration, bool presence){
  distance = duration*0.034/2;
  String server_time = getServerTime();
  if (day_start != "N/A" && isTimeLessThan(server_time, day_start) || isTimeLessThan(day_end, server_time)) {
    Serial.println("Rest time!");
    return true;
  }else if (distance > 1000 && presence && presence_count == 3){
    Serial.println("Worker out of working place!");
    createWorkerLogRequest("OC", "Out of working place");
    presence_count++;
    return false;
  }else if (distance < 10 && presence && presence_count == 3){
    Serial.println("Worker out of working place!");
    createWorkerLogRequest("CL", "Out of working place(probably tying fool device)");
    presence_count++;
    return false;
  }else if (distance > 1000 && presence && presence_count <= 3){
    presence_count++;
    return true;
  }else if (distance < 10 && presence && presence_count <= 3){
    presence_count++;
    return true;
  }else if (distance < 1000 && !presence && presence_count >= 3){
    Serial.println("Worker came back!");
    createWorkerLogRequest("CL", "Came back");
    presence_count = 0;
    return true;
  }else if (distance < 1000) {
    presence_count = 0;
    return true;
  }else{
    return false;
  }
};

bool isTimeLessThan(const String& time1, const String& time2) {
  int hours1 = time1.substring(0, 2).toInt();
  int minutes1 = time1.substring(3, 5).toInt();
  int seconds1 = time1.substring(6, 8).toInt();

  int hours2 = time2.substring(0, 2).toInt();
  int minutes2 = time2.substring(3, 5).toInt();
  int seconds2 = time2.substring(6, 8).toInt();

  if (hours1 < hours2)
    return true;
  else if (hours1 == hours2 && minutes1 < minutes2)
    return true;
  else if (hours1 == hours2 && minutes1 == minutes2 && seconds1 < seconds2)
    return true;

  return false;
}

void checkServerConnectionAndSendActivity(){
    if (activityRequest() == "error"){
      Serial.println("Failed to connect to server! I will try again in 5 seconds..."); 
      rgb(200, 0, 255);
      delay(5000);      
      checkServerConnectionAndSendActivity();        
    }else{
      rgb(0, 0, 0);
    }
}

String activityRequest() {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverAddress + "activity/");
  http.addHeader("Serial-Number", serial_number);
  int httpResponseCode = http.sendRequest("PUT", "");
  if (400 > httpResponseCode && httpResponseCode > 0) {
    return "succes";
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    return "error";
  }
  http.end();
}

String getOptions(){
  Serial.println("Sending optons request...");
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverAddress + "get-options/");
  http.addHeader("Serial-Number", serial_number);
  int httpCode = http.GET();
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);
    return payload;
  }
  return "";  
  http.end();
}

String getServerTime(){
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverAddress + "get-server-time/");
  http.addHeader("Serial-Number", serial_number);
  int httpCode = http.GET();
  if (httpCode > 0) {
    String payload = http.getString();
    Serial.println(payload);
    return getValueFromJsonString(payload, "server_time");
  }
  return "";  
  http.end();
}

void createWorkerLogRequest(String type, String description) {
  Serial.println("Sending request...");
  rgb(255, 0, 0);
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverAddress + "presence-log/");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Serial-Number", serial_number);

  String jsonData = "{\"type\":\"" + type + "\",\"description\":\"" + description + "\"}";
  Serial.println(jsonData);
  int httpResponseCode = http.POST(jsonData);
  rgb(0, 0, 0);
  if (httpResponseCode > 0) {
    Serial.print("HTTP response code: ");
    Serial.println(httpResponseCode);
  } else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    Serial.println(http.getString());
  }
  http.end();
}

String getValueFromJsonString(String jsonString, String key) {
  String value = "N/A";
  int keyIndex = jsonString.indexOf(key);
  if (keyIndex != -1) {
    int valueIndex = keyIndex + key.length() + 2;
    int valueEndIndex = jsonString.indexOf(",", valueIndex);

    if (valueEndIndex == -1) {
      valueEndIndex = jsonString.indexOf("}", valueIndex);
    }

    if (valueEndIndex != -1) {
      value = jsonString.substring(valueIndex, valueEndIndex);
    }
  }


  int checkQuotes = value.indexOf("\"");

  if (checkQuotes != -1 && checkQuotes == 0) {
    value = value.substring(1, value.length() - 1);
  }

  return value;
}

void handleRoot() {
  if (server.method() == HTTP_POST) {
    strncpy(iot_settings.domen,     server.arg("domen").c_str(),     sizeof(iot_settings.domen) );
    strncpy(iot_settings.serial_number, server.arg("serial_number").c_str(), sizeof(iot_settings.serial_number) );
    iot_settings.domen[server.arg("domen").length()] = iot_settings.serial_number[server.arg("serial_number").length()] = '\0';
    
    EEPROM.put(0, iot_settings);
    EEPROM.commit();

    server.send(200, "text/html", "<!doctype html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>Supervisor Setup</title><style>*,::after,::before{box-sizing:border-box;}body{margin:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans','Liberation Sans';font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#f5f5f5;}.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);border:1px solid #ced4da;}button{border:1px solid transparent;color:#fff;background-color:#007bff;border-color:#007bff;padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem;width:100%}.form-signin{width:100%;max-width:400px;padding:15px;margin:auto;}h1,p{text-align: center}</style> </head> <body><main class='form-signin'> <h1>Worker<span style='color: #D76525'>Online</span> Setup</h1> <br/> <p>Your settings have been saved successfully, now restart device!<br /></p></main></body></html>" );
  } else {
    server.send(200, "text/html", "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1' /><title>Supervisor Setup</title><style>*,::after,::before {box-sizing: border-box;}body{margin: 0;font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans';font-size: 1rem;font-weight: 400;line-height: 1.5;color: #FFFFFF;background-color: #363636;}.form-control {display: block;width: 100%;height: calc(1.5em + 0.75rem + 2px);border: 1px solid #ced4da;}.button {position: relative;cursor: pointer;border: 1px solid transparent;color: #fff;background-color: #D76525;border-color: #D76525;padding: 0.5rem 1rem;font-size: 1.25rem;line-height: 1.5;border-radius: 0.3rem;width: 100%;}.button--disable {pointer-events: none;background: #D76525;}.button:active {background: #D76525;}.button__text {color: #ffffff;transition: all 0.2s;letter-spacing: 1px;}.button--loading .button__text {visibility: hidden;opacity: 0;}.button--loading::after {content: '';position: absolute;width: 16px;height: 16px;top: 0;left: 0;right: 0;bottom: 0;margin: auto;border: 4px solid transparent;border-top-color: #ffffff;border-radius: 50%;animation: button-loading-spinner 1s ease infinite;}@keyframes button-loading-spinner {from {transform: rotate(0turn);}to {transform: rotate(1turn);}}.form-signin {width: 100%;max-width: 400px;padding: 15px;margin: auto;}h1 {text-align: center;}</style></head><body><main class='form-signin'><form action='/' method='post'><h1 class=''>Worker<span style='color: #D76525'>Online</span> Setup</h1> <br /><div class='form-floating'> <label>Domen</label><input type='text' class='form-control' name='domen' /> </div><div class='form-floating'> <br /><label>Secret key</label><input type='text' class='form-control'name='serial_number' /> </div> <br /><br /> <button type='submit' class='button'onclick='this.classList.add(`button--loading`, `button--disable`)'> <span class='button__text'>Save</span> </button><p style='text-align: right'> </p></form></main></body></html>" );
  }
}

void handlePortal() {
  if (server.method() == HTTP_POST) {
    strncpy(iot_settings.ssid,     server.arg("ssid").c_str(),     sizeof(iot_settings.ssid) );
    strncpy(iot_settings.password, server.arg("password").c_str(), sizeof(iot_settings.password) );
    iot_settings.ssid[server.arg("ssid").length()] = iot_settings.password[server.arg("password").length()] = '\0';
    
    EEPROM.put(0, iot_settings);
    EEPROM.commit();

    server.send(200, "text/html", "<!doctype html><html lang='en'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'><title>Supervisor Setup</title><style>*,::after,::before{box-sizing:border-box;}body{margin:0;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans','Liberation Sans';font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#f5f5f5;}.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);border:1px solid #ced4da;}button{border:1px solid transparent;color:#fff;background-color:#007bff;border-color:#007bff;padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem;width:100%}.form-signin{width:100%;max-width:400px;padding:15px;margin:auto;}h1,p{text-align: center}</style> </head> <body><main class='form-signin'> <h1>Worker<span style='color: #D76525'>Online</span> Setup</h1> <br/> <p>Your settings have been saved successfully, now restart device!<br /></p></main></body></html>" );
  } else {
    server.send(200, "text/html", "<!DOCTYPE html><html lang='en'><head><meta charset='utf-8' /><meta name='viewport' content='width=device-width, initial-scale=1' /><title>Supervisor Setup</title><style>*,::after,::before {box-sizing: border-box;}body{margin: 0;font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans';font-size: 1rem;font-weight: 400;line-height: 1.5;color: #FFFFFF;background-color: #363636;}.form-control {display: block;width: 100%;height: calc(1.5em + 0.75rem + 2px);border: 1px solid #ced4da;}.button {position: relative;cursor: pointer;border: 1px solid transparent;color: #fff;background-color: #D76525;border-color: #D76525;padding: 0.5rem 1rem;font-size: 1.25rem;line-height: 1.5;border-radius: 0.3rem;width: 100%;}.button--disable {pointer-events: none;background: #D76525;}.button:active {background: #D76525;}.button__text {color: #ffffff;transition: all 0.2s;letter-spacing: 1px;}.button--loading .button__text {visibility: hidden;opacity: 0;}.button--loading::after {content: '';position: absolute;width: 16px;height: 16px;top: 0;left: 0;right: 0;bottom: 0;margin: auto;border: 4px solid transparent;border-top-color: #ffffff;border-radius: 50%;animation: button-loading-spinner 1s ease infinite;}@keyframes button-loading-spinner {from {transform: rotate(0turn);}to {transform: rotate(1turn);}}.form-signin {width: 100%;max-width: 400px;padding: 15px;margin: auto;}h1 {text-align: center;}</style></head><body><main class='form-signin'><form action='/' method='post'><h1 class=''>Worker<span style='color: #D76525'>Online</span> Setup</h1> <br /><div class='form-floating'> <label>WIFI name</label><input type='text' class='form-control' name='ssid' /> </div><div class='form-floating'> <br /><label>Password</label><input type='password' class='form-control'name='password' /> </div> <br /><br /> <button type='submit' class='button'onclick='this.classList.add(`button--loading`, `button--disable`)'> <span class='button__text'>Save</span> </button><p style='text-align: right'> </p></form></main></body></html>" );
  }
}