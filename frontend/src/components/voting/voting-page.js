import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Voting from "./voting";
import {Button} from "@mui/material";
import CreateVotingForm from "./create-voting-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getVoting} from "../../store/company/voting/votingAction";
import {getTasks} from "../../store/company/tasks/tasksAction";


export default function VotingPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')


    useEffect(() => {
        dispatch(getVoting(token));
        dispatch(getTasks(token));
        // dispatch(getWorkers(token)).then((value) => setWorkers(value.payload));
    }, [])

    const vote_data = useSelector((state) => state.voting.voting_list);
    const is_loading = useSelector((state) => state.voting.is_loading);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
            <CreateVotingForm/>
            </Grid>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
                {vote_data.map((voting) => (
                    <Grid>
                        <Voting {...voting}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}