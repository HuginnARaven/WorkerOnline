import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {AddWorker, DeleteWorker, EditWorker, EditWorkerSchedule, SetError, SetWorkersList} from "./workersSlice";
import dayjs from "dayjs";


export const getWorkers = createAsyncThunk(
    'workers/get-all',
    async (search, thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const workersData = await companyAPI.getWorkers(token, search);
            thunkAPI.dispatch(SetWorkersList((workersData)))

            return workersData
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

export const createWorker = createAsyncThunk(
    'workers/create',
    async (workerData, thunkAPI) => {
        try {
            const {
                username,
                email,
                password,
                password2,
                first_name,
                last_name,
                qualification,
                working_hours,
                day_start,
                day_end,
                salary
            } = workerData

            const resWorkerCreation = await companyAPI.createWorker({username, email, password, password2, first_name, last_name, qualification, working_hours, day_start, day_end, salary});

            thunkAPI.dispatch(AddWorker(resWorkerCreation))


            return resWorkerCreation
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

export const editWorkerSchedule = createAsyncThunk(
    'workers/create',
    async (workerScheduleData, thunkAPI) => {
        try {
            const {
                id,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday,
            } = workerScheduleData

            const reqbody = {
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday
            }

            const resWorkerScheduleUpdate = await companyAPI.editWorkerSchedule(id, reqbody);

            thunkAPI.dispatch(EditWorkerSchedule(resWorkerScheduleUpdate))


            return resWorkerScheduleUpdate
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

export const editWorker = createAsyncThunk(
    'workers/edit',
    async (workerData, thunkAPI) => {
        try {
            const {
                id,
                username,
                email,
                password,
                password2,
                first_name,
                last_name,
                qualification,
                working_hours,
                day_start,
                day_end,
                salary
            } = workerData

            let reqbody = {}

            if (password || password2){
                reqbody = {
                    username: username,
                    email: email,
                    password: password,
                    password2: password2,
                    first_name: first_name,
                    last_name: last_name,
                    qualification: qualification,
                    working_hours: working_hours,
                    day_start: day_start,
                    day_end: day_end,
                    salary: salary,
                }
            }else {
                reqbody = {
                    username: username,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    qualification: qualification,
                    working_hours: working_hours,
                    day_start: day_start,
                    day_end: day_end,
                    salary: salary,
                }
            }

            const editedWorkerData = await companyAPI.editWorker(id, reqbody);
            thunkAPI.dispatch(EditWorker((editedWorkerData)))

            return editedWorkerData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            //thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const deleteWorker = createAsyncThunk(
    'workers/delete',
    async (workerId, thunkAPI) => {
        try {

            const worker = {
                id: workerId
            }
            const resDelete = await companyAPI.deleteWorker(workerId);
            thunkAPI.dispatch(DeleteWorker((worker)))

            return resDelete
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            //thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)