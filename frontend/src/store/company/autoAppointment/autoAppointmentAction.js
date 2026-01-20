import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {SetAutoAppointment, SetError} from "./autoAppointmentSlice";


export const getAutoAppointment = createAsyncThunk(
    'company/auto-appointment',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const autoAppointmentData = await companyAPI.getAutoAppointment((token));
           thunkAPI.dispatch(SetAutoAppointment((autoAppointmentData)))

            return autoAppointmentData
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

export const applyAutoAppointment = createAsyncThunk(
    'company/auto-appointment',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const autoAppointmentData = await companyAPI.applyAutoAppointment((token));
            thunkAPI.dispatch(SetAutoAppointment((autoAppointmentData)))

            return autoAppointmentData
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