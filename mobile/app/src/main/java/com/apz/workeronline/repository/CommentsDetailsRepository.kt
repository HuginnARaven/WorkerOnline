package com.apz.workeronline.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.apz.workeronline.api.CommentsAPI
import com.apz.workeronline.models.CommentRequest
import com.apz.workeronline.models.CommentResponse
import com.apz.workeronline.utils.NetworkResult
import org.json.JSONObject
import retrofit2.Response
import javax.inject.Inject

class CommentsDetailsRepository @Inject constructor(private val commentsAPI: CommentsAPI) {

    private val _oneCommentLiveData = MutableLiveData<NetworkResult<CommentResponse>>()
    val oneCommentLiveData: LiveData<NetworkResult<CommentResponse>>
        get() = _oneCommentLiveData


    private val _statusLiveData = MutableLiveData<NetworkResult<String>>()
    val statusLiveData: LiveData<NetworkResult<String>>
        get() = _statusLiveData


    private val _commentsLiveData = MutableLiveData<NetworkResult<List<CommentResponse>>>()
    val commentsLiveData: LiveData<NetworkResult<List<CommentResponse>>>
        get() = _commentsLiveData


    suspend fun getComment(commentId: String) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.getComment(commentId)

        if (response.isSuccessful && response.body() != null) {
            _oneCommentLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _oneCommentLiveData.postValue(NetworkResult.Error(errorObj.getString("detail")))
        } else {
            _oneCommentLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }

    suspend fun createComment(commentRequest: CommentRequest) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.createComment(commentRequest)
        handleResponse(response, "Comment Created")
    }

    suspend fun updateComment(commentId: String, commentRequest: CommentRequest) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.updateComment(commentId, commentRequest)
        handleResponse(response, "Comment Updated")
    }

    suspend fun deleteComment(commentId: String) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.deleteComment(commentId)
        handleResponse(response, "Comment Deleted")
    }


    suspend fun getComments(commentId: String) {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = commentsAPI.getComments(commentId)
        if (response.isSuccessful && response.body() != null) {
            _commentsLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _commentsLiveData.postValue(NetworkResult.Error(errorObj.getString("message")))
        } else {
            _commentsLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }


    private fun handleResponse(response: Response<CommentResponse>, message: String) {
        if (response.isSuccessful && response.body() != null) {
            _statusLiveData.postValue(NetworkResult.Success(message))
        } else {
            _statusLiveData.postValue(NetworkResult.Success("Something went wrong"))
        }
    }
}