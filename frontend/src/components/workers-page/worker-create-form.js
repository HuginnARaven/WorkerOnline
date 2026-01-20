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
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import {createWorker} from "../../store/company/workers/workersAction";
import {useTranslation} from "react-i18next";

export default function WorkerCreateForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const [username, setUsername] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [first_name, setFirstName] = React.useState(null);
    const [last_name, setLastName] = React.useState(null);
    const [qualification, setQualification] = React.useState(null);
    const [working_hours, setWorkingHours] = React.useState(null);
    const [day_start, setDayStart] = React.useState(dayjs('1992-01-01T08:00'));
    const [day_end, setDayEnd] = React.useState(dayjs('1992-01-01T18:00'));
    const [salary, setSalary] = useState(null);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUsername(null);
        setEmail(null);
        setPassword('');
        setPassword2('');
        setFirstName(null);
        setFirstName(null);
        setQualification(null);
        setWorkingHours(null);
        setDayStart(null);
        setDayEnd(null);
        setSalary(null);
        setErrors({});
    };

    let workerData = {
        username: username,
        email: email,
        password: password,
        password2: password2,
        first_name: first_name,
        last_name: last_name,
        qualification: qualification,
        working_hours: working_hours,
        day_start: dayjs(day_start).format("HH:mm:ss"),
        day_end: dayjs(day_end).format("HH:mm:ss"),
        salary: salary,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(workerData)
        const res = dispatch(createWorker(workerData))
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

    const qualifications_list = useSelector((state) => state.qualifications.qualifications_list);

    return (
        <div>
            <Fab sx={{position: 'fixed', bottom: 16, right: 16,}} aria-label={'Add'} color={'primary'} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('WorkersPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('WorkersPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="workerCreateForm">
                        <TextField
                            autoFocus
                            error={errors.username}
                            helperText={errors.username}
                            margin="dense"
                            id="worker-username"
                            label={t('form.username')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username}
                            onChange={(e)=> {setUsername(e.target.value)}}
                        />
                        <TextField
                            error={errors.email}
                            helperText={errors.email}
                            margin="dense"
                            id="worker-email"
                            label={t('form.email')}
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email}
                            onChange={(e)=> {setEmail(e.target.value)}}
                        />
                        <TextField
                            error={errors.password}
                            helperText={errors.password}
                            margin="dense"
                            id="worker-password"
                            label={t('form.password')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                        <TextField
                            error={errors.password2}
                            helperText={errors.password2}
                            margin="dense"
                            id="worker-password2"
                            label={t('form.password2')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password2}
                            onChange={(e)=> {setPassword2(e.target.value)}}
                        />
                        <TextField
                            error={errors.first_name}
                            helperText={errors.first_name}
                            margin="dense"
                            id="worker-first_name"
                            label={t('form.first_name')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={first_name}
                            onChange={(e)=> {setFirstName(e.target.value)}}
                        />
                        <TextField
                            error={errors.last_name}
                            helperText={errors.last_name}
                            margin="dense"
                            id="worker-last_name"
                            label={t('form.last_name')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={last_name}
                            onChange={(e)=> {setLastName(e.target.value)}}
                        />
                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('form.qualification')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="worker-qualifications"
                                value={qualification}
                                label={t('form.qualification')}
                                onChange={(e) => {setQualification(e.target.value)}}
                            >
                                {qualifications_list.map((qualification_item) => (
                                    <MenuItem key={`qualification-item-${qualification_item.id}`} value={qualification_item.id}>{qualification_item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={"row"} spacing={2} mt={2} justifyContent={"space-around"}>
                            <TimePicker
                                sx={{display:"flex"}}
                                key={"worker-day_start"}
                                variant="standard"
                                label={t('form.day_start')}
                                value={day_start}
                                onChange={(newValue) => setDayStart(newValue)}
                            />
                            <TimePicker
                                sx={{display:"flex"}}
                                key={"worker-day_end"}
                                variant="standard"
                                label={t('form.day_end')}
                                value={day_end}
                                onChange={(newValue) => setDayEnd(newValue)}
                            />
                        </Stack>
                        <TextField
                            error={errors.working_hours}
                            helperText={errors.working_hours}
                            margin="dense"
                            id="worker-working_hours"
                            label={t('form.working_hours')}
                            type="number"
                            fullWidth
                            variant="standard"
                            value={working_hours}
                            onChange={(e)=> {setWorkingHours(e.target.value)}}
                        />
                        <TextField
                            error={errors.salary}
                            helperText={errors.salary}
                            margin="dense"
                            id="worker-salary"
                            label={t('form.salary')}
                            type="number"
                            fullWidth
                            variant="standard"
                            value={salary}
                            onChange={(e)=> {setSalary(e.target.value)}}
                        />
                        {Object.entries(errors).map((error) => (
                            error[0] !== "name" && error[0] !== "modifier" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="workerCreateForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}