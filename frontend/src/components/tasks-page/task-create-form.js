import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import {createTask} from "../../store/company/tasks/tasksAction";
import {useTranslation} from "react-i18next";

export default function TaskCreateForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [estimate_hours, setEstimateHours] = React.useState('');
    const [difficulty, setDifficulty] = React.useState(null);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
        setTitle('');
        setDescription('');
        setEstimateHours('');
        setDifficulty(null);
    };

    const handleClose = () => {
        setOpen(false);
        setErrors({});
    };

    let taskData = {
        title: title,
        description: description,
        estimate_hours: estimate_hours,
        difficulty: difficulty,
    }

    const difficulties_list = useSelector((state) => state.qualifications.qualifications_list);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(taskData)
        const res = dispatch(createTask(taskData))
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
                    <form onSubmit={handleSubmit} id="qualificationCreateForm">
                        <TextField
                            autoFocus
                            error={errors.title}
                            helperText={errors.title}
                            margin="dense"
                            id="task-title"
                            label={t('form.title')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />

                        <TextField
                            error={errors.description}
                            helperText={errors.description}
                            margin="dense"
                            id="task-description"
                            label={t('form.description')}
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />

                        <TextField
                            error={errors.estimate_hours}
                            helperText={errors.estimate_hours}
                            margin="dense"
                            id="task-estimate_hours"
                            label={t('form.estimate_hours')}
                            type="number"
                            fullWidth
                            variant="standard"
                            value={estimate_hours}
                            onChange={(e) => {
                                setEstimateHours(e.target.value)
                            }}
                        />

                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('form.difficulty')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-difficulties"
                                value={difficulty}
                                label="Difficulty"
                                onChange={(e) => {setDifficulty(e.target.value)}}
                            >
                                {difficulties_list.map((difficulty_item) => (
                                    <MenuItem key={`difficulty-item-${difficulty_item.id}`} value={difficulty_item.id}>{difficulty_item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {Object.entries(errors).map((error) => (
                            error[0] !== "title" && error[0] !== "description" && error[0] !== "estimate_hours" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="qualificationCreateForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}