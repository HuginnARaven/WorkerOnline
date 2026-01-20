import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {SetWorkerReport, SetError} from "./workerReportSlice";


export const getWorkerReport = createAsyncThunk(
    'company/worker-report',
    async (workerId,thunkAPI) => {
        try {
            // const token = localStorage.getItem('access_token')
            const workerReportData = await companyAPI.getWorkerReport(workerId);
            thunkAPI.dispatch(SetWorkerReport((workerReportData)))

            return workerReportData
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