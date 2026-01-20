import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {AddVoting, DeleteVoting, EditVoting, SetError, SetVotingList} from "./votingSlice";


export const getVoting = createAsyncThunk(
    'voting/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const votingData = await companyAPI.getVoting((token));
           thunkAPI.dispatch(SetVotingList((votingData)))

            return votingData
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

export const createVoting = createAsyncThunk(
    'voting/create',
    async (votingData, thunkAPI) => {
        try {
            const {title, description, voting_tasks, deadline, is_active} = votingData
            console.log(votingData)
            const resVotingCreation = await companyAPI.createVoting({title, description, voting_tasks, deadline, is_active});

            thunkAPI.dispatch(AddVoting(resVotingCreation))


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

export const editVoting = createAsyncThunk(
    'voting/edit',
    async (votingData, thunkAPI) => {
        try {
            const {id, title, description, voting_tasks, deadline, is_active} = votingData

            const reqbody = {
                title: title,
                description: description,
                voting_tasks: voting_tasks,
                deadline: deadline,
                is_active: is_active,
            }

            const editedVotingData = await companyAPI.editVoting(id , reqbody);
            thunkAPI.dispatch(EditVoting((editedVotingData)))

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

export const deleteVoting = createAsyncThunk(
    'voting/delete',
    async (workerId, thunkAPI) => {
        try {

            const worker = {
                id : workerId
            }
            const resDelete = await companyAPI.deleteVoting(workerId);
            thunkAPI.dispatch(DeleteVoting((worker)))

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