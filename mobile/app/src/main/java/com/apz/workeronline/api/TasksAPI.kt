package com.apz.workeronline.api

import com.apz.workeronline.models.TaskRequest
import com.apz.workeronline.models.TaskResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.Path

interface TasksAPI {
    @GET("api/worker/tasks/")
    suspend fun getTasks(): Response<List<TaskResponse>>

    @PATCH("api/worker/tasks/{taskId}/")
    suspend fun updateTask(@Path("taskId") taskId: String, @Body taskRequest: TaskRequest): Response<TaskResponse>
}