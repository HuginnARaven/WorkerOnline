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
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {createTechSupportMessage} from "../../store/user/techSupport/techSupportAction";
import {useTranslation} from "react-i18next";

export default function TechSupportCreateForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTitle('');
        setDescription('');
        setErrors({});
    };

    let messageData = {
        title: title,
        description: description,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(messageData)
        const res = dispatch(createTechSupportMessage(messageData))
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
                <DialogTitle>{t('TechSupportPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('TechSupportPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="messageCreateForm">
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

                        {Object.entries(errors).map((error) => (
                            error[0] !== "title" && error[0] !== "description" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="messageCreateForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}