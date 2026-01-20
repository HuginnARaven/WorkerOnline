import * as React from 'react';
import {Box, Divider, Fab, FormControl, InputLabel, MenuItem, Paper, Select, Tooltip, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export default function WorkerTasksStatistics(props) {
    const { t } = useTranslation();
    const [selectedTask, setTask] = React.useState(props.worker_tasks_statistics.length ? props.worker_tasks_statistics[0].id : null);
    const [title, setTitle] = React.useState('');
    const [estimate_hours, setEstimateHours] = React.useState(0);
    const [times_out_of_working_place, setTimesTutOfWorkingPlace] = React.useState(0);
    const [task_performance, setTaskPerformance] = React.useState(0);
    const [is_deadline_met, setIsDeadlineMet] = React.useState(false);
    const [spent_working_hours, setSpentWorkingHours] = React.useState(0);
    const [time_start, setTimeStart] = React.useState('');
    const [time_end, setTimeEnd] = React.useState('');
    const [deadline, setDeadline] = React.useState('');

    const handleSelectTask = (taskId) => {
        setTask(taskId);
        setTitle(props.worker_tasks_statistics.find(item => item.id === taskId).title);
        setEstimateHours(props.worker_tasks_statistics.find(item => item.id === taskId).estimate_hours);
        setTimesTutOfWorkingPlace(props.worker_tasks_statistics.find(item => item.id === taskId).times_out_of_working_place);
        setTaskPerformance(props.worker_tasks_statistics.find(item => item.id === taskId).task_performance);
        setIsDeadlineMet(props.worker_tasks_statistics.find(item => item.id === taskId).is_deadline_met);
        setSpentWorkingHours(props.worker_tasks_statistics.find(item => item.id === taskId).spent_working_hours);
        setTimeStart(props.worker_tasks_statistics.find(item => item.id === taskId).time_start);
        setTimeEnd(props.worker_tasks_statistics.find(item => item.id === taskId).time_end);
        setDeadline(props.worker_tasks_statistics.find(item => item.id === taskId).deadline);
    };

    useEffect(() => {
        if (selectedTask){
            handleSelectTask(selectedTask)
        }
    }, [])

    return (
        <div>
                    {selectedTask ? (
                        <Paper sx={{p: 3}}>
                            <Typography variant="h5" mb={3} textAlign={"center"}>
                                {t('WorkerReportPage.worker_tasks_stat_title')}
                            </Typography>
                                <FormControl fullWidth variant="standard" sx={{mt: 1}}>
                                    <InputLabel id="demo-simple-select-label">Task</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="task-recommended-workers"
                                        value={selectedTask}
                                        label={t('form.task')}
                                        onChange={(e) => {
                                            handleSelectTask(e.target.value)
                                        }}
                                    >
                                        {props.worker_tasks_statistics.map((task) => (
                                            <MenuItem key={`recommended-worker-item-${task.id}`}
                                                      value={task.id}>{task.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            <Paper elevation={3} sx={{mt: 3}}>
                                <Box p={1}>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        {t('form.title')}: {title}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        {t('form.estimate_hours')}: {estimate_hours}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        {t('WorkerReportPage.times_out_of_working_place')}: {times_out_of_working_place}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Tooltip
                                        title={t('WorkerReportPage.task_performance_explanation')}
                                        followCursor>
                                        <Typography  variant="body1" textAlign={"left"}>
                                            {t('WorkerReportPage.performance')}: {task_performance}
                                        </Typography>
                                    </Tooltip>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        {t('WorkerReportPage.is_deadline_met')}: {is_deadline_met ? t('form.yes'): t('form.no')}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography  variant="body1" textAlign={"left"}>
                                        {t('WorkerReportPage.spent_working_hours')}: {spent_working_hours}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        {t('form.time_start')}: {time_start}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        {t('form.time_end')}: {time_end}
                                    </Typography>
                                    <Divider sx={{mt: 1, mb: 1}}/>
                                    <Typography variant="body1" textAlign={"left"}>
                                        {t('form.deadline')}: {deadline}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Paper>
                    ) : null}
        </div>
    );
}