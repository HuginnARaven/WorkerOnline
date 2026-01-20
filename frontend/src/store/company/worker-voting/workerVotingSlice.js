import {createSlice} from '@reduxjs/toolkit'
import {getWorkerVotingList} from "./workerVotingAction";

export const workerVotingSlice = createSlice({
    name: 'worker_voting',
    initialState: {
        worker_voting_list: [],
        is_loading: false,
        errors: [],
    },

    reducers: {
        SetWorkerVotingList: (state, action) => {
            state.worker_voting_list = action.payload || []
        },
        SetVote: (state, action) => {
            const indexOfVoting = state.worker_voting_list.findIndex(object => {
                return object.id === action.payload.voting;
            });
            console.log(indexOfVoting)
            const indexOfTask = state.worker_voting_list[indexOfVoting].voting_tasks.findIndex(object => {
                return object.id === action.payload.task;
            });
            console.log(indexOfTask)
            state.worker_voting_list[indexOfVoting].voting_tasks[indexOfTask].score = action.payload.score;
            state.worker_voting_list[indexOfVoting].voting_tasks[indexOfTask].user_vote_id = action.payload.id;
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },

    extraReducers: builder => {
        builder.addCase(getWorkerVotingList.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getWorkerVotingList.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetWorkerVotingList, SetVote, SetError} = workerVotingSlice.actions

export default workerVotingSlice.reducer