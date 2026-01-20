package com.apz.workeronline.models

data class LogResponse(
    val datetime: String,
    val description: String,
    val id: Int,
    val localized_datetime: String,
    val task: Int,
    val type: String
)