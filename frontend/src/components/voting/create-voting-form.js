import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskTransferField from "./task-transfer-field";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {createVoting} from "../../store/company/voting/votingAction";
import {login} from "../../store/auth/authAction";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {useTranslation} from "react-i18next";

export default function CreateVotingForm() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const [title, setTitle] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [tasks, setTasks] = React.useState([]);
    const [deadline, setDeadline] = React.useState(dayjs());
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle(null);
        setDescription(null);
        setTasks([]);
        setDeadline(dayjs());
        setErrors({});
    };

    const handleTaskChange = tasksData => {
        setTasks(tasksData);
    };

    let voteData = {
        title: title,
        description: description,
        voting_tasks: tasks.map((task, i) => task.id),
        deadline: deadline.toISOString(),
        is_active: true,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(voteData)
        const res = dispatch(createVoting(voteData));
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
            <Fab sx={{position: 'fixed', bottom: 16, right: 16,}} aria-label={'Add'} color={'primary'} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('VotingPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('VotingPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="createVotingForm">
                    <TextField
                        autoFocus
                        error={errors.title}
                        helperText={errors.title}
                        margin="dense"
                        id="title"
                        label={t('VotingPage.voting_title')}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={title}
                        onChange={(e)=> {setTitle(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        error={errors.description}
                        helperText={errors.description}
                        margin="dense"
                        id="description"
                        label={t('VotingPage.voting_description')}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e)=> {setDescription(e.target.value)}}
                    />
                    <TaskTransferField handleTaskChange={handleTaskChange} selected_tasks={tasks}/>
                        {errors.voting_tasks ?( <Alert sx={{mt:1}} severity="error">{errors.voting_tasks}</Alert>) : null}

                    <DateTimePicker sx={{mt:3, display:"flex"}}
                                    disablePast
                                    id="deadline"
                                    defaultValue={deadline}
                                    onChange={(e)=> {setDeadline(e)}}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="createVotingForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}