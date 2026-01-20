import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {SetError, SetWorkersLogs} from "./getLogsSlice";


export const getWorkersLogs = createAsyncThunk(
    'company/get-logs',
    async (token,thunkAPI) => {
        try {

            const token = localStorage.getItem('access_token')
            const logsData = await companyAPI.getLogs((token));
            thunkAPI.dispatch(SetWorkersLogs((logsData)))

            return logsData
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