import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Alert} from "@mui/material";
import {useDispatch} from "react-redux";
import {createVote} from "../../../store/company/worker-voting/workerVotingAction";

export default function WorkerVoteField(tasks_info) {

    const [score, setScore] = React.useState(tasks_info.score);
    const [errors, setErrors] = React.useState({});

    const user_vote_id = tasks_info.user_vote_id

    const dispatch = useDispatch();

    const vote_data = {
        task: tasks_info.id,
        voting: tasks_info.vote_id,
        score: score,
        user_vote_id: user_vote_id
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(vote_data)
        const res = dispatch(createVote(vote_data));
        res.then((value) => {
            console.log(value)
            if (value.error){
                setScore(tasks_info.score)
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                setErrors({})
            }
        });
    };

    return (
        <form id={`voteForm-${tasks_info.vote_id}-${tasks_info.id}`} onSubmit={handleSubmit}>
            <Divider sx={{mt:2, mb: 2}}/>
            <Alert severity={user_vote_id ? "success" : "warning"}>
            <Stack direction="row"
                   justifyContent="space-around"
                   alignItems="center"
                   spacing={2}>
                    <Typography variant="subtitle1">{tasks_info.title}</Typography>
                    <TextField sx={{maxWidth: 70}} id="outlined-basic" label="Score" variant="outlined" type="number" value={score} onChange={(e)=> setScore(e.target.value)}/>
                <Button variant="contained" form={`voteForm-${tasks_info.vote_id}-${tasks_info.id}`} type="submit">{user_vote_id ? "Save" : "Vote"}</Button>
            </Stack>
            </Alert>
            {Object.entries(errors).map((error) => (
                <Alert severity="error" sx={{mt:1}}>{error[0]}: {error[1]}</Alert>
            ))}
        </form>
    );
}