package com.apz.workeronline.api

import com.apz.workeronline.models.LogResponse
import retrofit2.Response
import retrofit2.http.GET

interface LogsAPI {
    @GET("api/worker/logs/")
    suspend fun getLogs(): Response<List<LogResponse>>
}