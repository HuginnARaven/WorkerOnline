import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Container, IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import WorkerItem from "./worker/worker-item";
import WorkerCreateForm from "./worker-create-form";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {getWorkers} from "../../store/company/workers/workersAction";
import {getQualifications} from "../../store/company/qualifications/qualificationsAction";

export default function WorkersPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(getWorkers(searchTerm));
        dispatch(getQualifications(token))
    }, [])

    const workers = useSelector((state) => state.workers.workers_list);
    const is_loading = useSelector((state) => state.workers.is_loading);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            dispatch(getWorkers(searchTerm));
        }
    };

    return (
        <Container maxWidth={"xl"}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Toolbar
                    sx={{
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '5px',
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item>
                            <IconButton>
                                <PersonSearchIcon color="inherit" sx={{display: 'block'}}/>
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search by name"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {fontSize: 'default'},
                                }}
                                variant="standard"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyDown={handleSearch}
                            />
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                    <WorkerCreateForm/>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                    {workers.map((worker) => (
                        <Grid>
                            <WorkerItem {...worker}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}