package com.apz.workeronline.api

import com.apz.workeronline.models.CommentRequest
import com.apz.workeronline.models.CommentResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path

interface CommentsAPI {
    @GET("api/worker/task/{taskId}/comments/")
    suspend fun getComments(@Path("taskId") apiaryId: String): Response<List<CommentResponse>>

    @POST("api/worker/comment-task/")
    suspend fun createComment(
        @Body commentRequest: CommentRequest
    ): Response<CommentResponse>

    @GET("api/worker/comment-task/{commentId}")
    suspend fun getComment(
        @Path("commentId") commentId: String
    ): Response<CommentResponse>

    @PATCH("api/worker/comment-task/{commentId}")
    suspend fun updateComment(
        @Path("commentId") commentId: String,
        @Body commentRequest: CommentRequest
    ): Response<CommentResponse>

    @DELETE("api/worker/comment-task/{commentId}")
    suspend fun deleteComment(
        @Path("commentId") commentId: String
    ): Response<CommentResponse>
}