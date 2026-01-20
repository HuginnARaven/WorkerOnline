package com.apz.workeronline.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.apz.workeronline.api.CommentsAPI
import com.apz.workeronline.models.CommentResponse
import com.apz.workeronline.utils.NetworkResult
import org.json.JSONObject
import javax.inject.Inject

class CommentsRepository @Inject constructor(private val commentsAPI: CommentsAPI) {

    private val _commentLiveData = MutableLiveData<NetworkResult<List<CommentResponse>>>()
    val commentLiveData: LiveData<NetworkResult<List<CommentResponse>>>
        get() = _commentLiveData

    private val _statusLiveData = MutableLiveData<NetworkResult<String>>()
    val statusLiveData: LiveData<NetworkResult<String>>
        get() = _statusLiveData


    suspend fun getComments(taskId: String) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.getComments(taskId)
        if (response.isSuccessful && response.body() != null) {
            _commentLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _commentLiveData.postValue(NetworkResult.Error(errorObj.getString("message")))
        } else {
            _commentLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }
}