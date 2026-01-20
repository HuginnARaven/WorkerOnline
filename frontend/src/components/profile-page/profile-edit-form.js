import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {register} from "../../store/auth/authAction";
import { useState } from 'react';
import EditIcon from "@mui/icons-material/Edit";
import {timezones_list} from "../../utils/timezones_list";
import {editUser} from "../../store/user/userAction";
import {useTranslation} from "react-i18next";

export default function ProfileEditForm(props) {
    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [timezone, setTimezone] = useState(props.timezone);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
        setUsername(props.username);
        setEmail(props.email);
        setName(props.name);
        setDescription(props.description);
        setTimezone(props.timezone);
        setErrors({})
    };

    const handleClose = () => {
        setOpen(false);
    };

    let userData = {
        username: username,
        email: email,
        name: name,
        description: description,
        timezone: timezone,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
        const res = dispatch(editUser(userData));
        res.then((value) => {
            if (value.error){
                console.log(value)
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
            <Stack direction={"row"} alignItems="center">
                <Button variant="contained" sx={{ml:2, mr:2}} onClick={handleClickOpen} fullWidth>{t('ProfilePage.edit_form_button')} <EditIcon/></Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('ProfilePage.edit_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('ProfilePage.edit_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="profileEditForm">
                        <TextField
                            autoFocus
                            error={errors.username}
                            helperText={errors.username}
                            margin="dense"
                            id="username"
                            label={t('form.username')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            error={errors.email}
                            helperText={errors.email}
                            margin="dense"
                            id="email"
                            label={t('form.email')}
                            type="email"
                            fullWidth
                            variant="standard"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            error={errors.name}
                            helperText={errors.name}
                            margin="dense"
                            id="name"
                            label={t('ProfilePage.company_name')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            error={errors.description}
                            helperText={errors.description}
                            margin="dense"
                            id="name"
                            label={t('form.description')}
                            type="text"
                            fullWidth
                            variant="standard"
                            multiline
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                        <FormControl fullWidth  variant="standard">
                            <InputLabel id="demo-simple-select-label">{t('ProfilePage.timezone')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-difficulties"
                                value={timezone}
                                label={t('ProfilePage.timezone')}
                                onChange={(e) => {setTimezone(e.target.value)}}
                            >
                                {timezones_list.map((timezones_item) => (
                                    <MenuItem key={`timezone-item-${timezones_item}`} value={timezones_item}>{timezones_item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="profileEditForm">{t('form.save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}