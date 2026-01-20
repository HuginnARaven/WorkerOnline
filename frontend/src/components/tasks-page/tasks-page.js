import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Container, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import TaskItem from "./task-item";
import TaskCreateForm from "./task-create-form";
import {getTasks} from "../../store/company/tasks/tasksAction";
import {getQualifications} from "../../store/company/qualifications/qualificationsAction";


export default function TasksPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(getTasks(token));
        dispatch(getQualifications(token));
    }, [])

    const tasks = useSelector((state) => state.tasks.tasks_list);
    const is_loading = useSelector((state) => state.tasks.is_loading);


    return (
        <Container maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                <TaskCreateForm/>
                </Grid>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {tasks.map((task) => (
                            <TaskItem {...task}/>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}