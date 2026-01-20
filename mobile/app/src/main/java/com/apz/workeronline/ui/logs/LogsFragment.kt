package com.apz.workeronline.ui.logs

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
import com.apz.workeronline.databinding.FragmentLogsBinding
import com.apz.workeronline.databinding.FragmentMainBinding
import com.apz.workeronline.models.LogResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.ui.tasks.TaskAdapter
import com.apz.workeronline.ui.tasks.TaskViewModel
import com.apz.workeronline.utils.NetworkResult
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class LogsFragment : Fragment() {
    private var _binding: FragmentLogsBinding? = null
    private val binding get() = _binding!!
    private val logViewModel by viewModels<LogsViewModel>()

    private lateinit var adapter: LogsAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentLogsBinding.inflate(inflater, container, false)
        adapter = LogsAdapter(::onLogClicked, requireContext())
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindObservers()
        logViewModel.getLogs()
        binding.logsList.layoutManager = StaggeredGridLayoutManager(1, StaggeredGridLayoutManager.VERTICAL)
        binding.logsList.adapter = adapter


    }

    private fun bindObservers() {
        logViewModel.logsLiveData.observe(viewLifecycleOwner, Observer {
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

    private fun onLogClicked(logResponse: LogResponse){
        val bundle = Bundle()
        bundle.putString("log", Gson().toJson(logResponse))
        findNavController().navigate(R.id.action_mainFragment_to_taskFormFragment, bundle)
        Toast.makeText(requireContext(), logResponse.description, Toast.LENGTH_SHORT).show()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}