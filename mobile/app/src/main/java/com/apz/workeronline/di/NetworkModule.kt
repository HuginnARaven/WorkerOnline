package com.apz.workeronline.di

import com.apz.workeronline.api.AuthInterceptor
import com.apz.workeronline.api.CommentsAPI
import com.apz.workeronline.api.LogsAPI
import com.apz.workeronline.api.ProfileAPI
import com.apz.workeronline.api.TasksAPI
import com.apz.workeronline.api.UserAPI
import com.apz.workeronline.utils.Constants.BASE_URL
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class NetworkModule {
    @Singleton
    @Provides
    fun providesRetrofitBuilder(): Retrofit.Builder {
        return Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(BASE_URL)

    }

    @Singleton
    @Provides
    fun provideOkHttpClient(authInterceptor: AuthInterceptor): OkHttpClient {
        return OkHttpClient.Builder().addInterceptor(authInterceptor).build()
    }

    @Singleton
    @Provides
    fun providesUserAPI(retrofitBuilder: Retrofit.Builder): UserAPI {
        return retrofitBuilder.build().create(UserAPI::class.java)
    }

    @Singleton
    @Provides
    fun providesTaskAPI(retrofitBuilder: Retrofit.Builder, okHttpClient: OkHttpClient): TasksAPI {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(TasksAPI::class.java)
    }

    @Singleton
    @Provides
    fun providesCommentsAPI(retrofitBuilder: Retrofit.Builder, okHttpClient: OkHttpClient): CommentsAPI {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(CommentsAPI::class.java)
    }

    @Singleton
    @Provides
    fun providesProfileAPI(retrofitBuilder: Retrofit.Builder, okHttpClient: OkHttpClient): ProfileAPI {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(ProfileAPI::class.java)
    }

    @Singleton
    @Provides
    fun providesLogsAPI(retrofitBuilder: Retrofit.Builder, okHttpClient: OkHttpClient): LogsAPI {
        return retrofitBuilder
            .client(okHttpClient)
            .build()
            .create(LogsAPI::class.java)
    }
}