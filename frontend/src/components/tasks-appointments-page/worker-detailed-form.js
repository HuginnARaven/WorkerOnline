import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Box, Grid, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";


export default function WorkerDetailedForm(props) {
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
            <Button onClick={handleClickOpen} variant="outlined" sx={{mb:2, width: "90%"}}>{t('AppointmentsPage.worker_info_get')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle textAlign={"center"}>{t('AppointmentsPage.worker_info_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid justifyContent={"center"} alignContent={"center"} columnSpacing={3} container>
                            <Grid item>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.email')}: {props.email}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.first_name')}: {props.first_name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.last_name')}: {props.last_name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.working_hours')}: {props.working_hours}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.qualification')}: {props.worker_qualification_info.name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.day_start')}: {props.day_start}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.day_end')}: {props.day_end}
                                </Typography>
                            </Grid>
                            <Grid item>
                                    <Typography textAlign={"center"}>
                                        {t('form.work_days')}:
                                    </Typography>
                                    <Paper sx={{p:2, mt: 2}}>
                                        <Typography variant="body1" textAlign={"left"}>
                                            {t('form.monday')}: {props.worker_schedule.monday ? t('form.yes') : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.tuesday')}: {props.worker_schedule.tuesday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.wednesday')}: {props.worker_schedule.wednesday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.thursday')}: {props.worker_schedule.thursday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.friday')}: {props.worker_schedule.friday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.saturday')}: {props.worker_schedule.saturday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                        <Typography variant="body1" textAlign={"left"}  mt={2} mb={2}>
                                            {t('form.sunday')}: {props.worker_schedule.sunday ? t('form.yes')  : t('form.no')}
                                        </Typography>
                                    </Paper>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}