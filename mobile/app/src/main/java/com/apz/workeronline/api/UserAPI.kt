package com.apz.workeronline.api

import com.apz.workeronline.models.ProfileResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.models.UserRequest
import com.apz.workeronline.models.UserResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST

interface UserAPI {
    @POST("/api/token/")
    suspend fun login(@Body userRequest: UserRequest) : Response<UserResponse>
}