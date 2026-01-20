import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {AddTask, AppointTask, DeleteTask, EditTask, SetError, SetTaskRecommendations, SetTasksList} from "./tasksSlice";
import {AddAppointment} from "../tasksAppointments/tasksAppointmentsSlice";


export const getTasks = createAsyncThunk(
    'tasks/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const tasksData = await companyAPI.getTasks((token));
            thunkAPI.dispatch(SetTasksList((tasksData)))

            return tasksData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData, thunkAPI) => {
        try {
            const {title, description, estimate_hours, difficulty} = taskData
            const resTaskCreation = await companyAPI.createTask({title, description, estimate_hours, difficulty});

            thunkAPI.dispatch(AddTask(resTaskCreation))


            return resTaskCreation
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }
            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const editTask = createAsyncThunk(
    'tasks/edit',
    async (taskData, thunkAPI) => {
        try {
            const {id, title, description, estimate_hours, difficulty} = taskData

            const reqbody = {
                title: title,
                description: description,
                estimate_hours: estimate_hours,
                difficulty: difficulty
            }

            const editedTaskData = await companyAPI.editTask(id, reqbody);
            thunkAPI.dispatch(EditTask((editedTaskData)))

            return editedTaskData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (taskId, thunkAPI) => {
        try {

            const task = {
                id: taskId
            }
            const resDelete = await companyAPI.deleteTask(taskId);
            thunkAPI.dispatch(DeleteTask((task)))

            return resDelete
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const appointTask = createAsyncThunk(
    'appointments/create',
    async (appointmentData, thunkAPI) => {
        try {
            const {task_appointed, worker_appointed, deadline} = appointmentData
            const resAppointmentCreation = await companyAPI.createAppointment({task_appointed, worker_appointed, deadline});

            thunkAPI.dispatch(AppointTask(resAppointmentCreation))


            return resAppointmentCreation
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }
            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)