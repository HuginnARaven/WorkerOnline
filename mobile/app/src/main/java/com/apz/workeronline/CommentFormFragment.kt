package com.apz.workeronline

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.apz.workeronline.databinding.FragmentCommentFormBinding
import com.apz.workeronline.models.CommentRequest
import com.apz.workeronline.models.CommentResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.ui.commentsDetails.CommentsDetailsViewModel
import com.apz.workeronline.utils.Constants.TAG
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CommentFormFragment : Fragment() {

    private var _binding: FragmentCommentFormBinding? = null
    private val binding get() = _binding!!
    private var comment: CommentResponse? = null
    private var task: TaskResponse? = null

    private val beehiveViewModel by viewModels<CommentsDetailsViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentCommentFormBinding.inflate(inflater, container, false)
        return binding.root
    }


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setInitialData()
        bindHandlers()

    }

    private fun bindHandlers() {
        binding.createCommentBtn.setOnClickListener {
            val text = binding.newCommentText.text.toString()
            val taskId = task!!.id
            val commentRequest = CommentRequest(taskId, text)



            if (comment == null) {
                comment.let {
                    Log.d(TAG, "Created comment" + task!!.id)
                    beehiveViewModel.createComment(commentRequest)
                }

//                findNavController().navigate(R.id.mainFragment)
                  findNavController().popBackStack()

            } else {
                beehiveViewModel.updateComment((comment!!.id).toString(), commentRequest)
                findNavController().popBackStack()
            }
        }
    }

    private fun setInitialData() {
        val jsonComment = arguments?.getString("edit")
        if (jsonComment != null) {
            comment = Gson().fromJson(jsonComment, CommentResponse::class.java)
            comment?.let {
                binding.newCommentText.setText(it.text)
            }
        }

        val jsonTask = arguments?.getString("taskId")
        if (jsonTask != null){
            task = Gson().fromJson(jsonTask, TaskResponse::class.java)
            binding.txtCommentTaskTitle.text = task?.task_title
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}