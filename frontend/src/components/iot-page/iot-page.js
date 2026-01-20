import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Container, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getIot} from "../../store/company/iot/iotAction";
import IotItem from "./iot-item";
import {getWorkers} from "../../store/company/workers/workersAction";




export default function IotPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(getIot(token));
        dispatch(getWorkers(''));
    }, [])

    const supervisors = useSelector((state) => state.iot.supervisors_list);
    const workers_list = useSelector((state) => state.workers.workers_list);

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
                </Grid>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {supervisors.map((supervisor) => (
                        <IotItem workers_list={workers_list} {...supervisor}/>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}