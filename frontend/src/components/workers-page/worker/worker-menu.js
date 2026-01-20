import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import {DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "@mui/material/Checkbox";
import {FormControl, FormControlLabel, InputLabel, Select} from "@mui/material";
import {green, red} from "@mui/material/colors";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import {deleteWorker, editWorker} from "../../../store/company/workers/workersAction";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function WorkerMenu(props) {
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const worker_data = props
    const [delUsername, setDelUsername] = React.useState("");
    const [username, setUsername] = React.useState(worker_data.username);
    const [email, setEmail] = React.useState(worker_data.email);
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [first_name, setFirstName] = React.useState(worker_data.first_name);
    const [last_name, setLastName] = React.useState(worker_data.last_name);
    const [qualification, setQualification] = React.useState(worker_data.qualification);
    const [working_hours, setWorkingHours] = React.useState(worker_data.working_hours);
    const [day_start, setDayStart] = React.useState(dayjs(`1992-01-01T${worker_data.day_start}`));
    const [day_end, setDayEnd] = React.useState(dayjs(`1992-01-01T${worker_data.day_end}`));
    const [salary, setSalary] = useState(worker_data);
    const [errors, setErrors] = useState({});

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(true);
        setUsername(worker_data.username);
        setEmail(worker_data.email);
        setPassword('');
        setPassword2('');
        setFirstName(worker_data.first_name);
        setLastName(worker_data.last_name);
        setQualification(worker_data.qualification);
        setWorkingHours(worker_data.working_hours);
        setDayStart(dayjs(`1992-01-01T${worker_data.day_start}`));
        setDayEnd(dayjs(`1992-01-01T${worker_data.day_end}`));
        setSalary(worker_data.salary);
        setErrors({});
    };

    const handleCloseEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(false);
    };

    const handleOpenDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(true);
    };

    const handleCloseDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(false);
        setDelUsername("")
        setErrors({});
    };

    const handleEditClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenEditForm();
    };
    const handleDeleteClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenDeleteForm();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let workerData = {
        id: worker_data.id,
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

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(workerData)
        const res = dispatch(editWorker(workerData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleCloseEditForm();
            }
        });
    };

    const handleSubmitDelete = (e) => {
        e.preventDefault();
        if (props.username !== delUsername) {
            setErrors({delUsername: "Incorrect name!"})
        }else {
            const res = dispatch(deleteWorker(workerData.id))
            res.then((value) => {
                console.log(value)
                if (value.error){
                    let errorMsg = JSON.parse(value.payload)
                    setErrors(errorMsg)
                    console.log(errors)
                }else {
                    handleCloseDeleteForm();
                }
            });
        }
    };

    const navigate = useNavigate ()

    function handleGetReport() {
        navigate('report', { state: { id: worker_data.id} });
        handleClose()
    }

    const qualifications_list = useSelector((state) => state.qualifications.qualifications_list);

    return (
        <div>
            <IconButton aria-label="settings"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleGetReport}>{t('WorkersPage.get_report')}</MenuItem>
                <MenuItem onClick={handleEditClick}>{t('form.update')}</MenuItem>
                <MenuItem onClick={handleDeleteClick}>{t('form.delete')}</MenuItem>
            </Menu>
            <Dialog open={openEditForm} onClose={handleClose}>
                <DialogTitle>{t('WorkersPage.edit_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('WorkersPage.edit_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmitEdit} id="workerEditForm">
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
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setPassword2(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                        />
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('form.qualification')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="worker-qualifications"
                                value={qualification}
                                label={t('form.qualification')}
                                onChange={(e) => {
                                    setQualification(e.target.value)
                                }}
                            >
                                {qualifications_list.map((qualification_item) => (
                                    <MenuItem key={`qualification-item-${qualification_item.id}`}
                                              value={qualification_item.id}>{qualification_item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={"row"} spacing={2} mt={2} justifyContent={"space-around"}>
                            <TimePicker
                                sx={{display: "flex"}}
                                key={"worker-day_start"}
                                variant="standard"
                                label={t('form.day_start')}
                                value={day_start}
                                onChange={(newValue) => setDayStart(newValue)}
                            />
                            <TimePicker
                                sx={{display: "flex"}}
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
                            onChange={(e) => {
                                setWorkingHours(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setSalary(e.target.value)
                            }}
                        />
                        {Object.entries(errors).map((error) => (
                            error[0] !== "name" && error[0] !== "modifier" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditForm}>{t('form.cancel')}</Button>
                    <Button type="submit" form="workerEditForm">{t('form.save')}</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDeleteForm}
                onClose={handleClose}
                aria-labelledby="alert-worker-delete-title"
                aria-describedby="alert-worker-delete-description"
            >
                <DialogTitle id="alert-worker-delete-title">
                    {first_name} {last_name}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitDelete} id={`deleteWorkerForm-${workerData.id}`}>
                        <DialogContentText id="alert-worker-delete-description">
                            {t('WorkersPage.delete_form_description_1')}<p/>
                            {t('WorkersPage.delete_form_description_2')}
                            <p>
                                {t('WorkersPage.delete_form_description_3')}
                            </p>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            error={errors.delUsername}
                            helperText={errors.delUsername}
                            margin="dense"
                            id="worker-username"
                            label={t('form.username')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={delUsername}
                            onChange={(e)=> {setDelUsername(e.target.value)}}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDeleteForm}>{t('form.cancel')}</Button>
                    <Button color={"error"} type="submit" form={`deleteWorkerForm-${workerData.id}`}>
                        {t('form.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}