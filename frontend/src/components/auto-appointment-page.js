import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {applyAutoAppointment, getAutoAppointment} from "../store/company/autoAppointment/autoAppointmentAction";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Skeleton, Snackbar} from "@mui/material";

export default function AutoAppointmentPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [openMessage, setOpenMessage] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(activeStep)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
    };

    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        dispatch(getAutoAppointment(token));
        // dispatch(getWorkers(token)).then((value) => setWorkers(value.payload));
    }, [])

    const workers = useSelector((state) => state.autoAppointment.workers);
    const tasks = useSelector((state) => state.autoAppointment.tasks);
    const assigned_tasks = useSelector((state) => state.autoAppointment.new_appointments.assigned_tasks);
    const assignment_steps = useSelector((state) => state.autoAppointment.new_appointments.steps);
    const previous_appointments = useSelector((state) => state.autoAppointment.previous_appointments);
    const is_loading = useSelector((state) => state.autoAppointment.is_loading);

    function is_worker_appointed(worker, task, assigned_tasks) {
        const assigned_task = assigned_tasks.find(obj => {
            return obj.worker_id === worker.id
        })
        if (assigned_task !== undefined) {
            if (assigned_task.task_id === task.id) {
                return true
            }
        }
        return false
    }

    const [errors, setErrors] = useState('');

    const handleApply = (e) => {
        e.preventDefault();
        const res = dispatch(applyAutoAppointment());
        res.then((value) => {
            console.log(value)
            if (value.error) {
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            } else {
                setOpenMessage(true)
                dispatch(getAutoAppointment(token));
            }
        });
    };

    return (
        <div>
            {assignment_steps[0] ? (
                <Box sx={{width: '100%'}}>
                    <Stepper activeStep={activeStep}>
                        {assignment_steps.map((assignment_step) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={assignment_step.step} {...stepProps}>
                                    <StepLabel {...labelProps}></StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === assignment_steps.length - 1 ? (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{mr: 1}}
                                >
                                    Back
                                </Button>
                                <Box sx={{flex: '1 1 auto'}}/>
                                <Button onClick={handleNext}>
                                    Next
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            ) : (
                <Box sx={{p: 2}}>
                    <Alert severity="warning">There are no workers to apply for tasks by now! (probably some workers that can be applied are busy now)!</Alert>
                </Box>
            )
            }
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {workers.map((worker) => (
                                <TableCell align="center">{worker.username} ({worker.productivity})</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow
                                key={task.title}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row" variant="head">
                                    {task.title}
                                </TableCell>
                                {workers.map((worker) => (is_loading ?
                                        <TableCell align="center"><Skeleton animation="wave"/></TableCell> :
                                        <TableCell align="center"
                                                   sx={assignment_steps[activeStep] ? is_worker_appointed(worker, task, assignment_steps[activeStep].assigned_tasks) ? {backgroundColor: "yellow"} : null : null}>
                                            {assignment_steps[activeStep] ? (is_worker_appointed(worker, task, assignment_steps[activeStep].assigned_tasks) ? (1) :
                                                (is_worker_appointed(worker, task, previous_appointments) ? (1) : (0))) :
                                                (is_worker_appointed(worker, task, previous_appointments) ? (1) : (0))}
                                        </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{p: 2}}>
                <Alert severity="info">This is an preview of auto appointment — click on the button to apply all
                    changes!</Alert>
            </Box>
            <Box sx={{p: 2}}>
                {assignment_steps[0] ? (
                    <Box sx={{p: 2}}>
                <Button variant="outlined" color="error" onClick={handleApply}>
                    Apply appointments
                </Button>
                    </Box>
                    ) : null}
                <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        All changes applyed!
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    );
}
