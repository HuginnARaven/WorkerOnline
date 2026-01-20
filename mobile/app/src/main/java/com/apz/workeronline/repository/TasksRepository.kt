package com.apz.workeronline.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.apz.workeronline.api.TasksAPI
import com.apz.workeronline.models.TaskRequest
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.utils.NetworkResult
import org.json.JSONObject
import retrofit2.Response
import javax.inject.Inject

class TasksRepository @Inject constructor(private val tasksAPI: TasksAPI){

    private val _tasksLiveData = MutableLiveData<NetworkResult<List<TaskResponse>>>()
    val tasksLiveData: LiveData<NetworkResult<List<TaskResponse>>>
        get() = _tasksLiveData

    private val _statusLiveData = MutableLiveData<NetworkResult<String>>()
    val statusLiveData: LiveData<NetworkResult<String>>
        get() = _statusLiveData

    suspend fun getTasks() {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = tasksAPI.getTasks()
        if (response.isSuccessful && response.body() != null) {
            _tasksLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _tasksLiveData.postValue(NetworkResult.Error(errorObj.getString("message")))
        } else {
            _tasksLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }

    suspend fun updateTask(taskId: String, taskRequest: TaskRequest) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = tasksAPI.updateTask(taskId, taskRequest)
        handleResponse(response, "Apiary Updated")

    }


    private fun handleResponse(response: Response<TaskResponse>, message: String) {
        if (response.isSuccessful && response.body() != null) {
            _statusLiveData.postValue(NetworkResult.Success(message))

        } else {
            _statusLiveData.postValue(NetworkResult.Success("Something went wrong"))
        }
    }

}