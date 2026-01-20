package com.apz.workeronline.models

data class TaskResponse(
    val comments: List<CommentResponse>,
    val id: Int,
    val is_done: Boolean,
    val status: String,
    val task_description: String,
    val task_estimate_hours: Int,
    val task_title: String,
    val time_end: String,
    val time_start: String,
    val deadline: String
)