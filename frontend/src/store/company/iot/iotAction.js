import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI} from "../../../utils/api";
import {SetIotList, EditIot, SetError} from "./iotSlice";


export const getIot = createAsyncThunk(
    'iot/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const iotData = await companyAPI.getSupervisors((token));
            thunkAPI.dispatch(SetIotList((iotData)))

            return iotData
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

export const editIot = createAsyncThunk(
    'iot/edit',
    async (iotData, thunkAPI) => {
        try {
            const {id, worker} = iotData

            const reqbody = {
                worker: worker,
            }

            const editedIotData = await companyAPI.editSupervisor(id, reqbody);
            thunkAPI.dispatch(EditIot((editedIotData)))

            return editedIotData
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