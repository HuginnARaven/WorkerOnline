package com.apz.workeronline.ui.logs

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.apz.workeronline.databinding.LogItemBinding

import com.apz.workeronline.models.LogResponse


class LogsAdapter (
    private val onLogClicked: (LogResponse) -> Unit,
    private var context: Context
) :
    ListAdapter<LogResponse, LogsAdapter.LogsViewHolder>(ComparatorDiffUtil()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): LogsViewHolder {
        val binding = LogItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return LogsViewHolder(binding)
    }

    override fun onBindViewHolder(holder: LogsViewHolder, position: Int) {
        val apiary = getItem(position)
        apiary?.let {
            holder.bind(it)
        }
    }

    @SuppressLint("SetTextI18n")
    inner class LogsViewHolder(private val binding: LogItemBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(log: LogResponse) {
            binding.txtLogDate.text = log.localized_datetime
            binding.txtLogDescription.text = log.description
        }
    }

    class ComparatorDiffUtil : DiffUtil.ItemCallback<LogResponse>() {
        override fun areItemsTheSame(oldItem: LogResponse, newItem: LogResponse): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: LogResponse, newItem: LogResponse): Boolean {
            return oldItem == newItem
        }
    }
}