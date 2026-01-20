package com.apz.workeronline.models

data class CommentRequest(
    val task_appointment: Int,
    val text: String
)