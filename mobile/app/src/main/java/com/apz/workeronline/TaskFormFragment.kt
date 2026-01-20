package com.apz.workeronline

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.apz.workeronline.databinding.FragmentTaskFormBinding
import com.apz.workeronline.models.TaskRequest
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.ui.tasks.TaskViewModel
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class TaskFormFragment : Fragment() {

    private var _binding: FragmentTaskFormBinding? = null
    private val binding get() = _binding!!
    private var task: TaskResponse? = null
    private val taskViewModel by viewModels<TaskViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment

        _binding = FragmentTaskFormBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setInitialData()
        bindHandlers()
    }

    private fun bindHandlers() {
        binding.btnSubmit.setOnClickListener {
            val isDone = binding.cbIsDone.isChecked
            val status = binding.txtStatus.text.toString()
            val taskRequest = TaskRequest(isDone, status)

            taskViewModel.updateTask((task!!.id).toString(), taskRequest)
            findNavController().popBackStack()
            findNavController().popBackStack()
        }
    }

    @SuppressLint("SetTextI18n")
    private fun setInitialData() {
        val jsonTask = arguments?.getString("task")
        if (jsonTask != null) {
            task = Gson().fromJson(jsonTask, TaskResponse::class.java)
            task?.let {
                binding.addEditText.text = it.task_title
                binding.txtTaskDescription.text = it.task_description
                binding.txtTimeStart.text = it.time_start
                binding.txtTimeEnd.text = it.time_end
                binding.txtDeadline.text = it.deadline

                binding.btnSubmit.isVisible = !it.is_done
                binding.btnSubmit.isEnabled = !it.is_done
                binding.btnSubmit.isClickable = !it.is_done
                binding.cbIsDone.isEnabled = !it.is_done
                binding.cbIsDone.isClickable = !it.is_done
                binding.txtStatus.isEnabled = !it.is_done
                binding.txtStatus.isClickable = !it.is_done

                binding.cbIsDone.isChecked = it.is_done
                binding.txtStatus.setText(it.status)
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

}