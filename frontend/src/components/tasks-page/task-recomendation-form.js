import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Divider, Fab, FormControl, InputLabel, MenuItem, Paper, Select, Tooltip, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers";
import {appointTask} from "../../store/company/tasks/tasksAction";
import {useTranslation} from "react-i18next";

export default function TaskRecommendationForm(props) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const [selectedWorker, setWorker] = React.useState(props.recommended_workers[0].id || null);
    const [selectedFirstName, setFirstName] = React.useState(null);
    const [selectedLastName, setLastName] = React.useState(null);
    const [selectedProductivity, setProductivity] = React.useState(null);
    const [selectedWorkingHours, setWorkingHours] = React.useState(null);
    const [selectedFinishDate, setFinishDate] = React.useState(null);
    const [deadline, setDeadline] = React.useState(dayjs());
    const [errors, setErrors] = useState({});

    const handleSelectWorker = (workerId) => {
        setWorker(workerId);
        setFirstName(props.recommended_workers.find(item => item.id === workerId).first_name);
        setLastName(props.recommended_workers.find(item => item.id === workerId).last_name);
        setProductivity(props.recommended_workers.find(item => item.id === workerId).productivity);
        setWorkingHours(props.recommended_workers.find(item => item.id === workerId).working_hours);
        setFinishDate(dayjs(props.recommended_workers.find(item => item.id === workerId).approx_finsh_date).format('DD/MM/YYYY'));
        setDeadline(dayjs(props.recommended_workers.find(item => item.id === workerId).approx_finsh_date));
    };

    const handleClickOpen = () => {
        setOpen(true);
        if (props.recommended_workers[0].id){
            handleSelectWorker(props.recommended_workers[0].id)
        }
    };

    const handleClose = () => {
        setOpen(false);
        setErrors({});
    };

    let taskData = {
        task_appointed: props.id,
        worker_appointed: selectedWorker,
        deadline: deadline.toISOString()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData)
        const res = dispatch(appointTask(taskData));
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleClose();
            }
        });
    };


    return (
        <div>
            <Button onClick={handleClickOpen} color={"success"}>{t('form.appoint')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('TasksPage.appoint_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('TasksPage.appoint_form_description')}
                    </DialogContentText>
                    {props.recommended_workers[0].id ? (
                        <>
                            <form onSubmit={handleSubmit} id="qualificationCreateForm">
                                <FormControl fullWidth variant="standard" sx={{mt: 1}}>
                                    <InputLabel id="demo-simple-select-label">{t('form.recommended_workers')}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="task-recommended-workers"
                                        value={selectedWorker}
                                        label="Recommended workers"
                                        onChange={(e) => {
                                            handleSelectWorker(e.target.value)
                                        }}
                                    >
                                        {props.recommended_workers.map((worker) => (
                                            <MenuItem key={`recommended-worker-item-${worker.id}`}
                                                      value={worker.id}>{worker.first_name} {worker.last_name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {Object.entries(errors).map((error) => (
                                    error[0] !== "name" && error[0] !== "modifier" ? (
                                        <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                                ))}
                            </form>
                            <Paper elevation={3} sx={{mt: 3}}>
                                <Box p={1}>
                                    <Typography>
                                        {t('form.first_name')}: {selectedFirstName}
                                    </Typography>
                                    <Divider/>
                                    <Typography>
                                        {t('form.last_name')}: {selectedLastName}
                                    </Typography>
                                    <Divider/>
                                    <Tooltip
                                        title={t('TasksPage.productivity_explanation')}
                                        followCursor>
                                        <Typography>
                                            {t('form.productivity')}: {selectedProductivity}
                                        </Typography>
                                    </Tooltip>
                                    <Divider/>
                                    <Typography>
                                        {t('form.working_hours')}: {selectedWorkingHours}
                                    </Typography>
                                    <Divider/>
                                    <Typography>
                                        {t('TasksPage.approximate_finish_date')}: {selectedFinishDate}
                                    </Typography>
                                </Box>
                            </Paper>
                        </>
                    ) : (
                        <Typography sx={{mt: 1}}>
                            {props.recommended_workers}
                        </Typography>
                    )}
                    {props.recommended_workers[0].id ?
                        <DateTimePicker sx={{mt:3, display:"flex"}}
                                        id="deadline"
                                        label={t('form.deadline')}
                                        defaultValue={deadline}
                                        onChange={(e)=> {setDeadline(e)}}
                                        format="LLL"
                                        disablePast
                        /> : null
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    {props.recommended_workers[0].id ?
                        <Button type="submit" form="qualificationCreateForm">{t('form.appoint')}</Button> : null}
                </DialogActions>
            </Dialog>
        </div>
    );
}