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
import {changePassword, editUser} from "../../store/user/userAction";
import Typography from "@mui/material/Typography";
import PasswordIcon from "@mui/icons-material/Password";
import {useTranslation} from "react-i18next";

export default function PasswordChangeForm() {
    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);
    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOldPassword('');
        setPassword('');
        setPassword2('');
        setErrors({})
        setOpen(false);
    };

    let passwordData = {
        old_password: old_password,
        password: password,
        password2: password2,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = dispatch(changePassword(passwordData));
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
                <Typography variant="body1" textAlign={"left"}>
                    {t('form.password')}:
                </Typography>
                <Button variant="contained" sx={{ml:2, mr:2}} onClick={handleClickOpen} fullWidth><PasswordIcon/>{t('ProfilePage.change')}<PasswordIcon/></Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('ProfilePage.password_change_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('ProfilePage.password_change_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="passwordChangeForm">
                        <TextField
                            autoFocus
                            error={errors.old_password}
                            helperText={errors.old_password}
                            margin="dense"
                            id="old_password"
                            label={t('form.password_old')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={old_password} onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            error={errors.password}
                            helperText={errors.password}
                            margin="dense"
                            id="email"
                            label={t('form.password_new')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            error={errors.password2}
                            helperText={errors.password2}
                            margin="dense"
                            id="name"
                            label={t('form.password2_new')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="passwordChangeForm">{t('form.save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}