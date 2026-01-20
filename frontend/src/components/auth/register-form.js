import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {login, register} from "../../store/auth/authAction";
import { useState } from 'react';
import {getUser} from "../../store/user/userAction";
import {useTranslation} from "react-i18next";

export default function RegisterFormDialog() {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    let userData = {
        username: username,
        email: email,
        password: password,
        password2: password2,
        name: name,
        description: description,
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData)
        const res = dispatch(register(userData));
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

    const is_loading = useSelector((state) => state.auth.isLoading);

    return (
        <div>
            <Button sx={{my: 2, color: 'white', display: 'block'}} onClick={handleClickOpen}>
                {t('ProfilePage.signup')}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('ProfilePage.signup_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('ProfilePage.signup_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="registerForm">
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
                            error={errors.password}
                            helperText={errors.password}
                            margin="dense"
                            id="password"
                            label={t('form.password')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            error={errors.password2}
                            helperText={errors.password2}
                            margin="dense"
                            id="password2"
                            label={t('form.password2')}
                            type="password"
                            fullWidth
                            variant="standard"
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
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
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="registerForm">{is_loading ? <CircularProgress />: t('ProfilePage.signup')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}