import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI, userAPI} from "../../utils/api";
import {SetAuthError, SetToken} from "./authSlice";
import {SetError, SetUser} from "../user/userSlice";


export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {

            const {username, password} = userData

            const resLogin = await userAPI.loginJWT({username, password}); // db request

            // localStorage.setItem('access_token', JSON.stringify(resLogin.token))
            localStorage.setItem('access_token', resLogin.access)
            localStorage.setItem('refresh_token', resLogin.refresh)
            thunkAPI.dispatch(SetToken(resLogin.access))
            return resLogin
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetAuthError(errorMsg))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (thunkAPI) => {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {

            const {username, password, password2, email, name, description} = userData

            const resRegister = await companyAPI.register({username, password, password2, email, name, description});
            const resLogin = await userAPI.loginJWT({username, password});
            localStorage.setItem('access_token', resLogin.access)
            localStorage.setItem('refresh_token', resLogin.refresh)
            thunkAPI.dispatch(SetToken(resLogin.access))
            thunkAPI.dispatch(SetUser({username, email,  role: "C", description, name}))

            return resRegister
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
);