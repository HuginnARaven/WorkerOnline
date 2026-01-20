import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {Alert, CircularProgress} from "@mui/material";
import {login} from "../../store/auth/authAction";
import { useState } from 'react';
import {getUser} from "../../store/user/userAction";
import {useTranslation} from "react-i18next";

export default function LoginFormDialog() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    let userData = {
        username: username,
        password: password,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        const res = dispatch(login(userData));
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                dispatch(getUser())
                handleClose();
            }
        });
    };

    const is_loading = useSelector((state) => state.auth.isLoading);

    return (
        <div>
            <Button sx={{my: 2, color: 'white', display: 'block'}} onClick={handleClickOpen}>
                {t('ProfilePage.login')}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('ProfilePage.login_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('ProfilePage.login_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="loginFrom">
                        <TextField
                            autoFocus
                            error={errors.username ? true : false}
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
                            error={errors.password ? true : false}
                            helperText={errors.password}
                            margin="dense"
                            id="password"
                            label={t('form.password')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {Object.entries(errors).map((error) => (
                            error[0] !== "username" && error[0] !== "password" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="loginFrom">{is_loading ? <CircularProgress />: t('ProfilePage.login')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}