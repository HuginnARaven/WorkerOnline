package com.apz.workeronline.ui.tasks

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.navigation.fragment.NavHostFragment.Companion.findNavController
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.apz.workeronline.R
import com.apz.workeronline.databinding.TaskItemBinding
import com.apz.workeronline.models.TaskResponse
import com.google.gson.Gson

class TaskAdapter(
    private val onTaskClicked: (TaskResponse, Boolean) -> Unit,
    private var context: Context
) :
    ListAdapter<TaskResponse, TaskAdapter.ApiaryViewHolder>(ComparatorDiffUtil()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ApiaryViewHolder {
        val binding = TaskItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ApiaryViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ApiaryViewHolder, position: Int) {
        val apiary = getItem(position)
        apiary?.let {
            holder.bind(it)
        }
    }

    @SuppressLint("SetTextI18n")
    inner class ApiaryViewHolder(private val binding: TaskItemBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(task: TaskResponse) {
            binding.title.text = task.task_title
            binding.description.text = task.task_description
            binding.goToInfoButton.setOnClickListener {
                onTaskClicked(task, true)
            }
            binding.goToCommentsButton.setOnClickListener {
                onTaskClicked(task, false)
            }
        }
    }

    class ComparatorDiffUtil : DiffUtil.ItemCallback<TaskResponse>() {
        override fun areItemsTheSame(oldItem: TaskResponse, newItem: TaskResponse): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: TaskResponse, newItem: TaskResponse): Boolean {
            return oldItem == newItem
        }
    }
}