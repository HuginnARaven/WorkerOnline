import {createSlice} from '@reduxjs/toolkit';
import {getTechSupportMessages} from "./techSupportAction";

export const techSupportSlice = createSlice({
    name: 'tech-support',
    initialState: {
        tech_support_messages_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetTechSupportMessagesList: (state, action) => {
            state.tech_support_messages_list = action.payload
        },
        AddTechSupportMessage: (state, action) => {
            state.tech_support_messages_list.push(action.payload)
        },
        EditTechSupportMessage: (state, action) => {
            const indexOfMessage = state.tech_support_messages_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tech_support_messages_list[indexOfMessage] = action.payload;
        },
        DeleteTechSupportMessage: (state, action) => {
            const indexOfMessage = state.tech_support_messages_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.tech_support_messages_list.splice(indexOfMessage, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getTechSupportMessages.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getTechSupportMessages.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetTechSupportMessagesList, AddTechSupportMessage, EditTechSupportMessage, DeleteTechSupportMessage, AppointTask, SetTaskRecommendations, SetError} = techSupportSlice.actions

export default techSupportSlice.reducer