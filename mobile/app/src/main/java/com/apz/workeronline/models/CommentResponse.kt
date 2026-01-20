package com.apz.workeronline.models

data class CommentResponse(
    val id: Int,
    val task_appointment: Int,
    val text: String,
    val time_created: String,
    val username: String
)