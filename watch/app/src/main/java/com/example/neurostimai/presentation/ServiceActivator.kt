package com.example.neurostimai.presentation

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.neurostimai.R

class ServiceActivator : Fragment() {

    companion object {
        fun newInstance() = ServiceActivator()
    }

    private lateinit var viewModel: ServiceActivatorViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_service_activator, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(ServiceActivatorViewModel::class.java)
        // TODO: Use the ViewModel
    }

}