import {createSlice} from '@reduxjs/toolkit'
import {getVoting} from "./votingAction";

export const votingSlice = createSlice({
    name: 'voting',
    initialState: {
        voting_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetVotingList: (state, action) => {
            state.voting_list = action.payload || []
        },
        AddVoting: (state, action) => {
            state.voting_list.push(action.payload)
        },
        EditVoting: (state, action) => {
            const indexOfVoting = state.voting_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.voting_list[indexOfVoting] = action.payload;
        },
        DeleteVoting: (state, action) => {
            const indexOfWorker = state.voting_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.voting_list.splice(indexOfWorker, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getVoting.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getVoting.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetVotingList, AddVoting, EditVoting, DeleteVoting, SetError} = votingSlice.actions

export default votingSlice.reducer