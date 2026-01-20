package com.apz.workeronline.ui.logs

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.models.TaskRequest
import com.apz.workeronline.repository.LogsRepository
import com.apz.workeronline.repository.TasksRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LogsViewModel  @Inject constructor(private val  logsRepository: LogsRepository) : ViewModel()  {

    val logsLiveData get() = logsRepository.logsLiveData
    val statusLiveData get() = logsRepository.statusLiveData


    fun getLogs(){
        viewModelScope.launch {
            logsRepository.getLogs()
        }
    }

}