import {createSlice} from '@reduxjs/toolkit'
import {getUser} from "./userAction";
import {logout} from "../auth/authAction";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        role: '',
        name: '',
        description: '',
        timezone: '',
        is_authorized: false,
        errorMsg: null,
    },
    reducers: {
        SetError: (state, action) => {
            state.errorMsg = action.payload
        },
        SetUser: (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.role = action.payload.role
            state.name = action.payload.name
            state.description = action.payload.description
            state.timezone = action.payload.timezone
            state.is_authorized = true;
        },
    },
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.username = action.payload.username || ''
            state.email = action.payload.email || ''
            state.role = action.payload.role || ''
            state.description = action.payload.description || ''
            state.name = action.payload.name || ''
            state.is_authorized = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.username = ''
            state.email = ''
            state.role = ''
            state.description = ''
            state.name = ''
            state.is_authorized = false;
        });
    }
})

export const {SetUser, SetError} = userSlice.actions

export default userSlice.reducer