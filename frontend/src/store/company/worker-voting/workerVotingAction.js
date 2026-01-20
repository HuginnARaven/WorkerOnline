import {createAsyncThunk} from "@reduxjs/toolkit";
import {workerAPI} from "../../../utils/api";
import {SetError, SetVote, SetWorkerVotingList} from "./workerVotingSlice";


export const getWorkerVotingList = createAsyncThunk(
    'worker/voting/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const votingData = await workerAPI.getVoting((token));
           thunkAPI.dispatch(SetWorkerVotingList((votingData)))

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

export const createVote = createAsyncThunk(
    'worker/vote',
    async (voteData, thunkAPI) => {
        try {
            const {task, voting, score, user_vote_id} = voteData

            let resVote = {}
            if (user_vote_id){
                resVote = await workerAPI.editVote(user_vote_id,{task, voting, score, user_vote_id});
            }else {
                resVote = await workerAPI.createVote({task, voting, score});
            }

            thunkAPI.dispatch(SetVote(resVote))


            return resVote
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