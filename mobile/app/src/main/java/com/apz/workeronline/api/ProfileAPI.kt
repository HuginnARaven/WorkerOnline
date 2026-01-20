package com.apz.workeronline.api

import com.apz.workeronline.models.ProfileResponse
import retrofit2.Response
import retrofit2.http.GET

interface ProfileAPI {
    @GET("api/profile/")
    suspend fun getProfile(): Response<ProfileResponse>
}