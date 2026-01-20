package com.apz.workeronline.models

data class ProfileResponse(
    val email: String,
    val first_name: String,
    val last_name: String,
    val role: String,
    val username: String,
    val worker_day_end: String,
    val worker_day_start: String,
    val worker_qualification: String,
    val worker_salary: Int
)