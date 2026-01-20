import {createSlice} from '@reduxjs/toolkit'
import {getTasks} from "./tasksAction";

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetTasksList: (state, action) => {
            state.tasks_list = action.payload || []
        },
        AddTask: (state, action) => {
            state.tasks_list.push(action.payload)
        },
        EditTask: (state, action) => {
            const indexOfTask = state.tasks_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tasks_list[indexOfTask] = action.payload;
        },
        AppointTask: (state, action) => {
            const indexOfTask = state.tasks_list.findIndex(object => {
                return object.id === action.payload.task_appointed;
            });
            state.tasks_list[indexOfTask].is_appointed = true;
            state.tasks_list[indexOfTask].recommended_workers = {};
        },
        DeleteTask: (state, action) => {
            const indexOfTask = state.tasks_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tasks_list.splice(indexOfTask, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getTasks.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetTasksList, AddTask, EditTask, DeleteTask, AppointTask, SetTaskRecommendations, SetError} = tasksSlice.actions

export default tasksSlice.reducer