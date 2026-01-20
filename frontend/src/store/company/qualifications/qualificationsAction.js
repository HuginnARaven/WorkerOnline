import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {
    AddQualification,
    DeleteQualification,
    EditQualification,
    SetError,
    SetQualificationsList
} from "./qualificationsSlice";


export const getQualifications = createAsyncThunk(
    'qualifications/get-all',
    async (token, thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const qualificationsData = await companyAPI.getQualifications((token));
            thunkAPI.dispatch(SetQualificationsList((qualificationsData)))

            return qualificationsData
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

export const createQualification = createAsyncThunk(
    'qualifications/create',
    async (qualificationData, thunkAPI) => {
        try {
            const {name, modifier} = qualificationData
            const resVotingCreation = await companyAPI.createQualification({name, modifier});

            thunkAPI.dispatch(AddQualification(resVotingCreation))


            return resVotingCreation
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

export const editQualification = createAsyncThunk(
    'qualifications/edit',
    async (qualificationData, thunkAPI) => {
        try {
            const {id, name, modifier} = qualificationData

            const reqbody = {
                name: name,
                modifier: modifier,
            }

            const editedVotingData = await companyAPI.editQualification(id, reqbody);
            thunkAPI.dispatch(EditQualification((editedVotingData)))

            return editedVotingData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            //thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const deleteQualification = createAsyncThunk(
    'qualifications/delete',
    async (qualificationId, thunkAPI) => {
        try {

            const qualification = {
                id: qualificationId
            }
            const resDelete = await companyAPI.deleteQualification(qualificationId);
            thunkAPI.dispatch(DeleteQualification((qualification)))

            return resDelete
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            //thunkAPI.dispatch(SetError(errorMsg.non_field_errors[0]))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)