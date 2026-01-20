package com.apz.workeronline.ui.comments

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.apz.workeronline.databinding.CommentItemBinding
import com.apz.workeronline.models.CommentResponse


class CommentAdapter (private val onCommentClicked: (CommentResponse) -> Unit) :
    ListAdapter<CommentResponse, CommentAdapter.CommentViewHolder>(ComparatorDiffUtil()) {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
        val binding = CommentItemBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CommentViewHolder(binding)
    }

    override fun onBindViewHolder(holder: CommentViewHolder, position: Int) {
        val apiary = getItem(position)
        apiary?.let {
            holder.bind(it)
        }
    }

    inner class CommentViewHolder(private val binding: CommentItemBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(comment: CommentResponse) {
            binding.txtCommentUsername.text = comment.username
            binding.txtCommentText.text = comment.text
            binding.root.setOnClickListener {
                onCommentClicked(comment)
            }
        }
    }

    class ComparatorDiffUtil : DiffUtil.ItemCallback<CommentResponse>() {
        override fun areItemsTheSame(oldItem: CommentResponse, newItem: CommentResponse): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: CommentResponse, newItem: CommentResponse): Boolean {
            return oldItem == newItem
        }
    }

}