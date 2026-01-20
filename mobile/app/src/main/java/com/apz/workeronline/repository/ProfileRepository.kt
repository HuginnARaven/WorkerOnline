package com.apz.workeronline.repository

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.apz.workeronline.api.ProfileAPI
import com.apz.workeronline.api.UserAPI
import com.apz.workeronline.models.ProfileResponse
import com.apz.workeronline.models.UserRequest
import com.apz.workeronline.models.UserResponse
import com.apz.workeronline.utils.NetworkResult
import org.json.JSONObject
import retrofit2.Response
import javax.inject.Inject

class ProfileRepository  @Inject constructor(private val userAPI: ProfileAPI) {


    private val _profileResponseLiveData = MutableLiveData<NetworkResult<ProfileResponse>>()
    val profileResponseLiveData: LiveData<NetworkResult<ProfileResponse>>
        get() = _profileResponseLiveData

    private val _statusLiveData = MutableLiveData<NetworkResult<String>>()
    val statusLiveData: LiveData<NetworkResult<String>>
        get() = _statusLiveData


//    suspend fun getProfile() {
//        _profileResponseLiveData.postValue(NetworkResult.Loading())
//        val response = userAPI.getProfile()
//        handleResponse(response)
//    }

    suspend fun getProfile() {
        _statusLiveData.postValue(NetworkResult.Loading())
        val response = userAPI.getProfile()
        if (response.isSuccessful && response.body() != null) {
            _profileResponseLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _profileResponseLiveData.postValue(NetworkResult.Error(errorObj.getString("detail")))
        } else {
            _profileResponseLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }


    private fun handleResponse(response: Response<ProfileResponse>) {
        if (response.isSuccessful && response.body() != null) {
            _profileResponseLiveData.postValue(NetworkResult.Success(response.body()!!))
        } else if (response.errorBody() != null) {
            val errorObj = JSONObject(response.errorBody()!!.charStream().readText())
            _profileResponseLiveData.postValue(NetworkResult.Error(errorObj.getString("detail")))
        } else {
            _profileResponseLiveData.postValue(NetworkResult.Error("Something went wrong"))
        }
    }
}