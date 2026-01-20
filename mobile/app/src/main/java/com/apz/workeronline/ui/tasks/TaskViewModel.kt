package com.apz.workeronline.ui.tasks

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apz.workeronline.models.TaskRequest
import com.apz.workeronline.repository.TasksRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TaskViewModel @Inject constructor(private val  tasksRepository: TasksRepository) : ViewModel()  {

    val tasksLiveData get() = tasksRepository.tasksLiveData
    val statusLiveData get() = tasksRepository.statusLiveData


    fun getTasks(){
        viewModelScope.launch {
            tasksRepository.getTasks()
        }
    }

    fun updateTask(taskId: String, taskRequest: TaskRequest){
        viewModelScope.launch {
            tasksRepository.updateTask(taskId, taskRequest)
        }
    }
}