import {createSlice} from '@reduxjs/toolkit'
import {getQualifications} from "./qualificationsAction";

export const qualificationsSlice = createSlice({
    name: 'qualifications',
    initialState: {
        qualifications_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetQualificationsList: (state, action) => {
            state.qualifications_list = action.payload || []
        },
        AddQualification: (state, action) => {
            state.qualifications_list.push(action.payload)
        },
        EditQualification: (state, action) => {
            const indexOfQualification = state.qualifications_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.qualifications_list[indexOfQualification] = action.payload;
        },
        DeleteQualification: (state, action) => {
            const indexOfQualification = state.qualifications_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.qualifications_list.splice(indexOfQualification, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getQualifications.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getQualifications.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetQualificationsList, AddQualification, EditQualification, DeleteQualification, SetError} = qualificationsSlice.actions

export default qualificationsSlice.reducer