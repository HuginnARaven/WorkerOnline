package com.apz.workeronline.ui.comments

import android.app.AlertDialog
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.apz.workeronline.R
import com.apz.workeronline.databinding.FragmentCommentsBinding
import com.apz.workeronline.models.CommentResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.ui.commentsDetails.CommentsDetailsViewModel
import com.apz.workeronline.ui.tasks.TaskViewModel
import com.apz.workeronline.utils.Constants.TAG
import com.apz.workeronline.utils.NetworkResult
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class CommentFragment : Fragment() {

    private var _binding: FragmentCommentsBinding? = null
    private val binding get() = _binding!!
    private var task: TaskResponse? = null

    private val commentDetailsViewModel by viewModels<CommentsDetailsViewModel>()
    private val taskViewModel by viewModels<TaskViewModel>()

    private lateinit var adapter: CommentAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentCommentsBinding.inflate(inflater, container, false)
        adapter = CommentAdapter(::onBeehiveClicked)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


        setInitialData()
        bindObservers()
        Log.d(TAG, "BEEHIVE FRAGMENT" + task!!.toString())
        commentDetailsViewModel.getComments((task!!.id).toString())



        binding.commentList.layoutManager =
            StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL)
        binding.commentList.adapter = adapter
        binding.addComment.setOnClickListener {
            val bundle = Bundle()
            bundle.putString("taskId", Gson().toJson(task))
            findNavController().navigate(R.id.action_commentsFragment_to_commentFormFragment, bundle)
        }

        binding.textView.text = task!!.task_title
    }


    private fun setInitialData() {
        val jsonApiary = arguments?.getString("task")
        if (jsonApiary != null) {
            task = Gson().fromJson(jsonApiary, TaskResponse::class.java)
            Log.d(TAG, task.toString())
        }
    }

    private fun bindObservers() {
        commentDetailsViewModel.commentsLiveData.observe(viewLifecycleOwner, Observer {
            binding.progressBar.isVisible = false
            when (it) {
                is NetworkResult.Success -> {
                    adapter.submitList(it.data)
                }
                is NetworkResult.Error -> {
                    Toast.makeText(requireContext(), it.message.toString(), Toast.LENGTH_SHORT)
                        .show()
                }
                is NetworkResult.Loading -> {
                    binding.progressBar.isVisible = true
                }

            }
        })
    }

    private fun onBeehiveClicked(commentResponse: CommentResponse) {
//        val bundle = Bundle()
//        bundle.putString("beehive", Gson().toJson(beehiveResponse))
//        findNavController().navigate(R.id.action_beehiveFragment_to_beehiveDetails, bundle)
//        Toast.makeText(requireContext(), beehiveResponse.name, Toast.LENGTH_SHORT)
//            .show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }


}