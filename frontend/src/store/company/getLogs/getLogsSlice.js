import {createSlice} from '@reduxjs/toolkit'
import {getWorkersLogs} from "./getLogsAction";

export const getLogsSlice = createSlice({
    name: 'logs',
    initialState: {
        worker_logs_list: [],
        errorMsg: null,
        is_loading: false,
    },
    reducers: {
        SetWorkersLogs: (state, action) => {
            console.log(action.payload)
            state.worker_logs_list = action.payload
        },
        SetError: (state, action) => {
            state.errorMsg = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getWorkersLogs.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getWorkersLogs.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetWorkersLogs, SetError} = getLogsSlice.actions

export default getLogsSlice.reducer