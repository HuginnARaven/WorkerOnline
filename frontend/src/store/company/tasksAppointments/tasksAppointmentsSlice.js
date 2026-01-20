import {createSlice} from '@reduxjs/toolkit'
import {getAppointments} from "./tasksAppointmentsAction";

export const tasksAppointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetAppointmentsList: (state, action) => {
            state.appointments_list = action.payload || []
        },
        AddAppointment: (state, action) => {
            state.appointments_list.push(action.payload)
        },
        CommentAppointment: (state, action) => {
            const indexOfAppointment = state.appointments_list.findIndex(object => {
                return object.id === action.payload.task_appointment;
            });
            state.appointments_list[indexOfAppointment].comments.push(action.payload);
        },
        DeleteComment: (state, action) => {
            const indexOfAppointment = state.appointments_list.findIndex(object => {
                return object.id === action.payload.task_appointment;
            });
            const indexOfComment = state.appointments_list[indexOfAppointment].comments.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.appointments_list[indexOfAppointment].comments.splice(indexOfComment, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getAppointments.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getAppointments.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetAppointmentsList, AddAppointment, CommentAppointment, DeleteComment, SetError} = tasksAppointmentsSlice.actions

export default tasksAppointmentsSlice.reducer