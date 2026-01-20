import {createSlice} from '@reduxjs/toolkit'
import {getWorkers} from "./workersAction";

export const workersSlice = createSlice({
    name: 'workers',
    initialState: {
        workers_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetWorkersList: (state, action) => {
            state.workers_list = action.payload || []
        },
        AddWorker: (state, action) => {
            state.workers_list.push(action.payload)
        },
        EditWorker: (state, action) => {
            const indexOfWorker = state.workers_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.workers_list[indexOfWorker] = action.payload;
        },
        EditWorkerSchedule: (state, action) => {
            const indexOfWorker = state.workers_list.findIndex(object => {
                return object.id === action.payload.worker_id;
            });
            state.workers_list[indexOfWorker].worker_schedule = action.payload;
        },
        DeleteWorker: (state, action) => {
            const indexOfWorker = state.workers_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.workers_list.splice(indexOfWorker, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getWorkers.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getWorkers.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetWorkersList, AddWorker, EditWorker, EditWorkerSchedule, DeleteWorker, SetError} = workersSlice.actions

export default workersSlice.reducer