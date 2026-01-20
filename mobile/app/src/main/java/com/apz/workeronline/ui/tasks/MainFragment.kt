package com.apz.workeronline.ui.tasks

import android.os.Bundle
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
import com.apz.workeronline.databinding.FragmentMainBinding
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.utils.NetworkResult
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainFragment : Fragment()  {

    private var _binding: FragmentMainBinding? = null
    private val binding get() = _binding!!
    private val taskViewModel by viewModels<TaskViewModel>()

    private lateinit var adapter: TaskAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentMainBinding.inflate(inflater, container, false)
        adapter = TaskAdapter(::onTaskClicked, requireContext())
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindObservers()
        taskViewModel.getTasks()
        binding.apiaryList.layoutManager = StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL)
        binding.apiaryList.adapter = adapter

        binding.profileButton.setOnClickListener {
            findNavController().navigate(R.id.action_mainFragment_to_profileFragment)
        }

        binding.settingsBtn.setOnClickListener {
            findNavController().navigate(R.id.action_mainFragment_to_settingsFragment2)
        }
    }

    private fun bindObservers() {
        taskViewModel.tasksLiveData.observe(viewLifecycleOwner, Observer {
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

    private fun onTaskClicked(taskResponse: TaskResponse, is_task_action: Boolean){
        if (is_task_action){
            val bundle = Bundle()
            bundle.putString("task", Gson().toJson(taskResponse))
            findNavController().navigate(R.id.action_mainFragment_to_taskFormFragment, bundle)
            Toast.makeText(requireContext(), taskResponse.task_title, Toast.LENGTH_SHORT).show()
        }
        else{
            val bundle = Bundle()
            bundle.putString("task", Gson().toJson(taskResponse))
            findNavController().navigate(R.id.action_mainFragment_to_commentFormFragment, bundle)
            Toast.makeText(requireContext(), taskResponse.task_title, Toast.LENGTH_SHORT).show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}