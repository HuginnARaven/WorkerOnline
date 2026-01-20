package com.apz.workeronline

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class WorkerOnlineApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        instance = this
    }



    companion object {
        lateinit var instance: WorkerOnlineApplication
            private set
    }
}