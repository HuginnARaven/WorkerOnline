package com.apz.workeronline.ui.comments

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.repository.CommentsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CommentViewModel @Inject constructor(private val commentsRepository: CommentsRepository): ViewModel(){

    val commentLiveData get() = commentsRepository.commentLiveData
    val statusLiveData get() = commentsRepository.statusLiveData

    fun getComments(taskId: String){
        viewModelScope.launch {
            commentsRepository.getComments(taskId)
        }
    }
}