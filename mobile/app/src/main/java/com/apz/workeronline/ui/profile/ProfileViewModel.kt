package com.apz.workeronline.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.repository.CommentsRepository
import com.apz.workeronline.repository.ProfileRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(private val profileRepository: ProfileRepository): ViewModel(){

    val profileLiveData get() = profileRepository.profileResponseLiveData
    val statusLiveData get() = profileRepository.statusLiveData

    fun getProfile(){
        viewModelScope.launch {
            profileRepository.getProfile()
        }
    }
}