package com.apz.workeronline.ui.login

import android.app.Application
import android.text.TextUtils
import android.util.Patterns
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.R
import com.apz.workeronline.models.UserRequest
import com.apz.workeronline.models.UserResponse
import com.apz.workeronline.repository.UserRepository
import com.apz.workeronline.utils.NetworkResult
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val userRepository: UserRepository,
    application: Application
) : AndroidViewModel(application) {

    val userResponseLiveData: LiveData<NetworkResult<UserResponse>>
        get() = userRepository.userResponseLiveData

    fun loginUser(userRequest: UserRequest) {
        viewModelScope.launch {
            userRepository.loginUser(userRequest)
        }
    }

    fun validateCredentials(
        username: String,
        password: String,
        isLogin: Boolean
    ): Pair<Boolean, String> {
        var result = Pair(true, "")
        if ((!isLogin && TextUtils.isEmpty(username)) ||
            TextUtils.isEmpty(password)
        ) {
            result = Pair(false, getApplication<Application>().resources.getString(R.string.txt_valid_all_credentials))
        } else if (!TextUtils.isEmpty(password) && password.length <= 5) {
            result = Pair(false, getApplication<Application>().resources.getString(R.string.txt_valid_password_length))
        }
        return result

    }

}