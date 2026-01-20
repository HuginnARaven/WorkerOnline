import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {useTranslation} from "react-i18next";


export default function TaskDetailedForm(props) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" sx={{mb:2, width: "90%"}}>{t('AppointmentsPage.task_info_get')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign={"center"}>{t('AppointmentsPage.task_info_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="body1" textAlign={"left"}>
                            {t('form.title')}: {props.title}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            {t('form.description')}: {props.description}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            {t('form.estimate_hours')}: {props.estimate_hours}
                        </Typography>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <Typography variant="body1" textAlign={"left"}>
                            {t('form.needed_qualification')}: {props.task_difficulty_info.name}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}