import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button, Container, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import QualificationItem from "./qualification-item";
import QualificationCreateForm from "./qualification-create-form";
import {getQualifications} from "../../store/company/qualifications/qualificationsAction";


export default function QualificationsPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(getQualifications(token));
        // dispatch(getWorkers(token)).then((value) => setWorkers(value.payload));
    }, [])

    const qualifications = useSelector((state) => state.qualifications.qualifications_list);
    const is_loading = useSelector((state) => state.qualifications.is_loading);


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
                    <QualificationCreateForm/>
                </Grid>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {qualifications.map((qualification) => (
                            <QualificationItem {...qualification}/>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}