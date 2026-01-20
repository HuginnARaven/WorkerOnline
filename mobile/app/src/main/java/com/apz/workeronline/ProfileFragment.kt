package com.apz.workeronline

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.StaggeredGridLayoutManager
import com.apz.workeronline.databinding.FragmentMainBinding
import com.apz.workeronline.databinding.FragmentProfileBinding
import com.apz.workeronline.models.ProfileResponse
import com.apz.workeronline.models.TaskResponse
import com.apz.workeronline.models.UserResponse
import com.apz.workeronline.ui.profile.ProfileViewModel
import com.apz.workeronline.ui.tasks.TaskAdapter
import com.apz.workeronline.ui.tasks.TaskViewModel
import com.apz.workeronline.utils.Constants
import com.apz.workeronline.utils.NetworkResult
import com.apz.workeronline.utils.TokenManager
import com.google.gson.Gson
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!
    private val profileViewModel by viewModels<ProfileViewModel>()
    private var user: ProfileResponse? = null

    @Inject
    lateinit var tokenManager: TokenManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        bindObservers()
        profileViewModel.getProfile()

        binding.logoutBtn.setOnClickListener {
            tokenManager.deleteToken()
            findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
            requireActivity().intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            startActivity(requireActivity().intent)
        }

        binding.goToLogsBtn.setOnClickListener {
            findNavController().navigate(R.id.action_profileFragment_to_logsFragment)
        }
    }

    private fun bindObservers() {
        profileViewModel.profileLiveData.observe(viewLifecycleOwner, Observer {
            binding.progressBar.isVisible = false
            when (it) {
                is NetworkResult.Success -> {
                    user = it.data
                    binding.txtUsername.text = it.data?.username
                    binding.txtEmail.text = it.data?.email
                    binding.txtQualification.text = it.data?.worker_qualification
                    binding.txtDayStart.text = it.data?.worker_day_start
                    binding.txtDayEnd.text = it.data?.worker_day_end
                    binding.txtSalary.text = it.data?.worker_salary.toString()
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

    private fun setInitialData() {

    }

}