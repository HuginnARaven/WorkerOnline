import * as React from 'react';
import {Backdrop, Button, CircularProgress, Container, IconButton, Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import TestComponent from "../../test-component";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getWorkerReport} from "../../../store/company/workerReport/workerReportAction";
import WorkerLogs from "./worker-logs";
import WorkerChart from "./worker-chart";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import WorkerTasksStatistics from "./worker-tasks-statistics";
import {useTranslation} from "react-i18next";


export default function WorkerReportPage() {
    const { t } = useTranslation();
    const {state} = useLocation();
    const {id} = state;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWorkerReport(id));
    }, [])

    const worker_report = useSelector((state) => state.worker_report);
    const is_loading = useSelector((state) => state.worker_report.is_loading);


    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {is_loading ? (
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={is_loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            ) : (
                <Grid rowSpacing={1} alignItems="stretch" columnSpacing={{xs: 1, sm: 2, mt: 3}} container>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <Typography variant="h5" mb={3} textAlign={"center"}>
                                    {t('WorkerReportPage.worker_title')}
                                </Typography>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.username')}: {worker_report.username}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.email')}: {worker_report.email}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.first_name')}: {worker_report.first_name}
                                </Typography>
                                <Divider sx={{mt: 2, mb: 2}}/>
                                <Typography variant="body1" textAlign={"left"}>
                                    {t('form.last_name')}: {worker_report.last_name}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid sx={{mt: 2}} item>
                            <WorkerTasksStatistics worker_tasks_statistics={worker_report.worker_tasks_statistics}/>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <Grid item>
                            <WorkerChart worker_statistics_by_days={worker_report.worker_statistics_by_days}/>
                        </Grid>
                        <Grid sx={{mt: 2}} item>
                            <WorkerLogs workerId={id}/>
                        </Grid>
                    </Grid>
                </Grid>)}
        </Box>
    );
}