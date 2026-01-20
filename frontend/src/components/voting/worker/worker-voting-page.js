import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import WorkerVoting from "./worker-voting";
import {getWorkerVotingList} from "../../../store/company/worker-voting/workerVotingAction";


// const voting = [
//     {
//         id: 8,
//         title: "Whtich task must we appoint first?",
//         description: "Today, we choose which task to complete first",
//         max_score: 10,
//         min_score: 0,
//         voting_tasks: [
//             {
//                 id: 2,
//                 title: "Create voting serializer",
//                 score: 5,
//                 user_vote_id: 8
//             },
//             {
//                 id: 1,
//                 title: "Create voting models",
//                 score: 3,
//                 user_vote_id: 7
//             }
//         ],
//         deadline: "2023-06-05T18:00:00Z",
//         is_active: false
//     },
//     {
//         id: 14,
//         title: "Tests",
//         description: "TestsTestsTestsTestsTests",
//         max_score: 10,
//         min_score: 0,
//         voting_tasks: [
//             {
//                 id: 1,
//                 title: "Create voting models",
//                 score: 4,
//                 user_vote_id: 23
//             },
//             {
//                 id: 3,
//                 title: "Create voting views",
//                 score: 0,
//                 user_vote_id: null
//             }
//         ],
//         deadline: "2023-06-02T22:11:59Z",
//         is_active: true
//     }
// ]


export default function WorkerVotingPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')


    useEffect(() => {
        dispatch(getWorkerVotingList(token));
    }, [])

    const voting = useSelector((state) => state.worker_voting.worker_voting_list);
    const is_loading = useSelector((state) => state.worker_voting.is_loading);

    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
            </Grid>
            <Grid
                container
                spacing={3}
                direction={'row'}
                mt={'30px'}
                justifyContent="center"
            >
                {voting.map((voting) => (
                    <Grid>
                        <WorkerVoting {...voting}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}