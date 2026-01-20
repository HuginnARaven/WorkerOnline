import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../../utils/api";
import {
    SetTechSupportMessagesList,
    SetError,
    AddTechSupportMessage,
    EditTechSupportMessage,
    DeleteTechSupportMessage
} from "./techSupportSlice";


export const getTechSupportMessages = createAsyncThunk(
    'tech-support/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const tasksData = await userAPI.getTechSupportMessages((token));
            thunkAPI.dispatch(SetTechSupportMessagesList((tasksData)))

            return tasksData
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

export const createTechSupportMessage = createAsyncThunk(
    'tech-support/create',
    async (messageData, thunkAPI) => {
        try {
            const {title, description} = messageData
            const resTaskCreation = await userAPI.createTechSupportMessage({title, description});

            thunkAPI.dispatch(AddTechSupportMessage(resTaskCreation))


            return resTaskCreation
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

export const editTechSupportMessage = createAsyncThunk(
    'tech-support/edit',
    async (messageData, thunkAPI) => {
        try {
            const {id, title, description} = messageData

            const reqbody = {
                title: title,
                description: description,
            }

            const editedTaskData = await userAPI.editTechSupportMessage(id, reqbody);
            thunkAPI.dispatch(EditTechSupportMessage((editedTaskData)))

            return editedTaskData
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

export const deleteTechSupportMessage = createAsyncThunk(
    'tech-support/delete',
    async (messageId, thunkAPI) => {
        try {

            const task = {
                id: messageId
            }
            const resDelete = await userAPI.deleteTechSupportMessage(messageId);
            thunkAPI.dispatch(DeleteTechSupportMessage((task)))

            return resDelete
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