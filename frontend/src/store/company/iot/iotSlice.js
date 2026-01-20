import {createSlice} from '@reduxjs/toolkit'
import {getIot} from "./iotAction";

export const iotSlice = createSlice({
    name: 'iot',
    initialState: {
        supervisors_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetIotList: (state, action) => {
            state.supervisors_list = action.payload
        },
        EditIot: (state, action) => {
            const indexOfSupervisor = state.supervisors_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.supervisors_list[indexOfSupervisor] = action.payload;
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getIot.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getIot.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetIotList, EditIot, SetError} = iotSlice.actions

export default iotSlice.reducer