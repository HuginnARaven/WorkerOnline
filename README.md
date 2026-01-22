# WorkerOnline

**WorkerOnline** is a complex full-stack ecosystem designed to manage remote employees, monitor productivity, and automate task assignments. 

Unlike standard CRUD applications, this system integrates **IoT hardware** for real-time presence monitoring, a **Native Android App** for employees, and a **Web Dashboard** for management, all communicating via a centralized **REST API**.

## 🛠️ Tech Stack

### Backend
* **Language:** Python 3.x
* **Framework:** Django, Django REST Framework (DRF)
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)
* **Key Libs:** `django-filter`, `apscheduler` (for automated tasks)

### Frontend (Web)
* **Framework:** React.js
* **State Management:** Redux Toolkit
* **UI Component Library:** Material UI
* **Architecture:** SPA (Single Page Application)

### Mobile App (Android)
* **Language:** Kotlin
* **Architecture:** MVVM (Model-View-ViewModel)
* **Networking:** Retrofit2, OkHttp
* **Platform:** Android SDK

### IoT (Hardware)
* **Controller:** NodeMCU (ESP8266)
* **Sensors:** HC-SR04 (Ultrasonic sensor)
* **Language:** C++ (Arduino IDE)
* **Communication:** HTTP REST Client via Wi-Fi

---

## ✨ Key Features

### For Companies (Web Dashboard)
* **Smart Task Assignment:** An algorithm that recommends the best worker for a specific task based on historical productivity statistics and current workload.
* **Real-time Monitoring:** View active status of employees based on IoT sensor data.
* **Analytics & Reports:** Visual graphs of employee performance, logs, and completed tasks.
* **Management:** CRUD operations for users, tasks, and qualifications.

### For Workers (Mobile App)
* **Task Management:** View assigned tasks, deadlines, and update status (To Do -> In Progress -> Done).
* **Performance Tracking:** View personal productivity stats and logs.
* **Communication:** Comment system for discussing specific tasks with managers.
* **Offline Mode:** MVVM architecture ensures smooth UI even with unstable connection.

### IoT Module
* **Presence Detection:** Automatically logs "Out of Workplace" events when the worker leaves the desk.
* **Wi-Fi Config:** Custom "Access Point" mode for initial Wi-Fi setup without hardcoding credentials.
* **Security:** Hardware-based authentication key for server communication.

---

## 🚀 The Process & Engineering Decisions

This project was built to simulate a real-world enterprise environment where software meets hardware.

* **Monorepo Structure:** All 4 components are hosted in this repository to demonstrate the full system scope.
    * `/server` - Django API
    * `/client` - React App
    * `/mobile` - Kotlin Android Project
    * `/iot` - C++ Firmware
* **Database Design:** A normalized PostgreSQL schema handling complex relationships between `Workers`, `Tasks`, `Logs`, and `IoT Devices`.
* **API First:** The backend exposes 60+ endpoints documentation, serving as the single source of truth for Web, Mobile, and IoT clients.

---

## 💡 What I Learned

* **System Design:** How to architect a distributed system where multiple disparate clients (Browser, Phone, Microcontroller) sync with a single database.
* **Cross-platform Development:** Gained hands-on experience in shifting context between Python, JavaScript, Kotlin, and C++.
* **IoT Integration:** Solved challenges related to hardware interrupts, signal noise filtering (HC-SR04), and HTTP requests on resource-constrained devices.
* **Algorithmic Logic:** Implemented a custom recommendation engine for task distribution based on weighted coefficients of worker efficiency.

---

## ⚙️ Running the Project

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
# Create .env file with DB credentials
python manage.py migrate
python manage.py runserver
```
### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
### 3. Mobile
* Open the `/mobile` folder in Android Studio.
* Sync Gradle files.
* Run on an Emulator or Physical Device.

### 4. IoT Setup
* Assemble the circuit according to the wiring diagram provided in the `/iot` directory.
* Open the firmware code in **Arduino IDE**, connect the NodeMCU via USB, install necessary drivers and libraries, and upload the sketch to the board.
* Connect to the Wi-Fi hotspot created by the device, open the configuration page in your browser (default IP is usually `192.168.4.1`), and enter your local Wi-Fi credentials.