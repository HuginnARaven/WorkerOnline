import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {
    AddAppointment,
    CommentAppointment,
    DeleteComment,
    SetAppointmentsList,
    SetError
} from "./tasksAppointmentsSlice";


export const getAppointments = createAsyncThunk(
    'appointments/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const appointmentsData = await companyAPI.getAppointments((token));
            thunkAPI.dispatch(SetAppointmentsList((appointmentsData)))

            return appointmentsData
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

export const createAppointment = createAsyncThunk(
    'appointments/create',
    async (appointmentData, thunkAPI) => {
        try {
            const {task_appointed, worker_appointed, deadline} = appointmentData
            const resAppointmentCreation = await companyAPI.createAppointment({task_appointed, worker_appointed, deadline});

            thunkAPI.dispatch(AddAppointment(resAppointmentCreation))


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

export const commentAppointment = createAsyncThunk(
    'appointments/comment',
    async (commentData, thunkAPI) => {
        try {
            const {text, task_appointment} = commentData
            const resCommentCreation = await companyAPI.commentAppointment({text, task_appointment});

            thunkAPI.dispatch(CommentAppointment(resCommentCreation))


            return resCommentCreation
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

export const deleteComment = createAsyncThunk(
    'appointments/delete-comment',
    async (commentData, thunkAPI) => {
        try {
            const {id, task_appointment} = commentData
            const resCommentCreation = await companyAPI.deleteComment(id);

            thunkAPI.dispatch(DeleteComment((commentData)))


            return resCommentCreation
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