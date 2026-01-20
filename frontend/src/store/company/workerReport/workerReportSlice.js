import {createSlice} from '@reduxjs/toolkit'
import {getWorkerReport} from "./workerReportAction";

export const workerReportSlice = createSlice({
    name: 'worker-report',
    initialState: {
        id: 0,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        worker_general_statistics: {
            tasks_done: 0,
            times_out_of_working_place: 0,
            times_deadline_not_met: 0
        },
        worker_tasks_statistics: [],
        worker_statistics_by_days: [],
        errorMsg: {},
        is_loading: false,
    },
    reducers: {
        SetWorkerReport: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.email = action.payload.email
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.worker_general_statistics = action.payload.worker_general_statistics
            state.worker_tasks_statistics = action.payload.worker_tasks_statistics
            state.worker_statistics_by_days = action.payload.worker_statistics_by_days
        },
        SetError: (state, action) => {
            state.errorMsg = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getWorkerReport.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getWorkerReport.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetWorkerReport, SetError} = workerReportSlice.actions

export default workerReportSlice.reducer