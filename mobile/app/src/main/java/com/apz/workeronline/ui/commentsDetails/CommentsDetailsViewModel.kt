package com.apz.workeronline.ui.commentsDetails

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.models.CommentRequest
import com.apz.workeronline.repository.CommentsDetailsRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class CommentsDetailsViewModel @Inject constructor(private val commentsDetailsRepository: CommentsDetailsRepository) :
    ViewModel() {

    val oneCommentLiveData get() = commentsDetailsRepository.oneCommentLiveData
    val commentsLiveData get() = commentsDetailsRepository.commentsLiveData
    val statusLiveData get() = commentsDetailsRepository.statusLiveData

    fun getBeehive(commentId: String) {
        viewModelScope.launch {
            commentsDetailsRepository.getComment(commentId)
        }
    }

    fun createComment(commentRequest: CommentRequest) {
        viewModelScope.launch {
            commentsDetailsRepository.createComment(commentRequest)
        }
    }

    fun updateComment(commentId: String, commentRequest: CommentRequest){
        viewModelScope.launch {
            commentsDetailsRepository.updateComment(commentId, commentRequest)
        }
    }

    fun deleteComment(commentId: String) {
        viewModelScope.launch {
            commentsDetailsRepository.deleteComment(commentId)
        }
    }

    fun getComments(taskId: String){
        viewModelScope.launch {
            commentsDetailsRepository.getComments(taskId)
        }
    }
}