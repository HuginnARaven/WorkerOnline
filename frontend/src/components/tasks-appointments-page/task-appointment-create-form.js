import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab, FormControl, FormHelperText, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import {createTask} from "../../store/company/tasks/tasksAction";
import {useTranslation} from "react-i18next";
import {createAppointment} from "../../store/company/tasksAppointments/tasksAppointmentsAction";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function TaskAppointmentCreateForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const [task, setTask] = React.useState(null);
    const [worker, setWorker] = React.useState(null);
    const [deadline, setDeadline] = React.useState(null);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTask(null);
        setWorker(null);
        setDeadline(null)
        setErrors({});
    };

    let appointmentData = {
        task_appointed: task,
        worker_appointed: worker,
        deadline: deadline,
    }

    const workers_list = useSelector((state) => state.workers.workers_list);
    const tasks_list = useSelector((state) => state.tasks.tasks_list);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(appointmentData)
        const res = dispatch(createAppointment(appointmentData))
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
            <Fab sx={{position: 'fixed', bottom: 16, right: 16,}} aria-label={'Add'} color={'primary'}
                 onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('TasksPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('TasksPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="appointmentCreateForm">

                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('form.worker')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-difficulties"
                                value={worker}
                                error={errors.worker_appointed}
                                label={t('form.worker')}
                                onChange={(e) => {setWorker(e.target.value)}}
                            >
                                {workers_list.map((worker_item) => (
                                    <MenuItem key={`worker-item-${worker_item.id}`} value={worker_item.id}>{worker_item.username}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.worker_appointed}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('form.task')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-difficulties"
                                error={errors.task_appointed}
                                value={task}
                                label={t('form.task')}
                                onChange={(e) => {setTask(e.target.value)}}
                            >
                                {tasks_list.map((task_item) => (
                                    !task_item.is_appointed ? <MenuItem key={`task-item-${task_item.id}`} value={task_item.id}>{task_item.title}</MenuItem> : null
                                ))}
                            </Select>
                            <FormHelperText>{errors.task_appointed}</FormHelperText>
                        </FormControl>
                        <DateTimePicker sx={{mt:3, display:"flex"}}
                                        id="deadline"
                                        label={t('form.deadline')}
                                        defaultValue={deadline}
                                        onChange={(e)=> {setDeadline(e)}}
                                        format="LLL"
                                        disablePast
                        />
                        {Object.entries(errors).map((error) => (
                            error[0] !== "task_appointed" && error[0] !== "worker_appointed" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="appointmentCreateForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}