package com.apz.workeronline.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.apz.workeronline.api.LogsAPI
import com.apz.workeronline.api.TasksAPI
import com.apz.workeronline.models.LogResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.utils.NetworkResult
import org.json.JSONObject
import javax.inject.Inject

class LogsRepository @Inject constructor(private val logsAPI: LogsAPI) {
    private val _logsLiveData = MutableLiveData<NetworkResult<List<LogResponse>>>()
    val logsLiveData: LiveData<NetworkResult<List<LogResponse>>>
        get() = _logsLiveData

    private val _statusLiveData = MutableLiveData<NetworkResult<String>>()
    val statusLiveData: LiveData<NetworkResult<String>>
        get() = _statusLiveData

    suspend fun getLogs() {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = logsAPI.getLogs()
        if (response.isSuccessful && response.body() != null) {
            _logsLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _logsLiveData.postValue(NetworkResult.Error(errorObj.getString("detail")))
        } else {
            _logsLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }
}