import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControlLabel, FormGroup, Stack, Tooltip} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import {green, red} from "@mui/material/colors";
import {editWorkerSchedule} from "../../../store/company/workers/workersAction";
import {useTranslation} from "react-i18next";

export default function WorkerScheduleEdit(props) {
    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);

    const schedule_data = props

    const [monday, setMonday] = React.useState(schedule_data.monday);
    const [tuesday, setTuesday] = React.useState(schedule_data.tuesday);
    const [wednesday, setWednesday] = React.useState(schedule_data.wednesday);
    const [thursday, setThursday] = React.useState(schedule_data.thursday);
    const [friday, setFriday] = React.useState(schedule_data.friday);
    const [saturday, setSaturday] = React.useState(schedule_data.saturday);
    const [sunday, setSunday] = React.useState(schedule_data.sunday);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
        setMonday(props.monday);
        setTuesday(props.tuesday);
        setWednesday(props.wednesday);
        setThursday(props.thursday);
        setFriday(props.friday);
        setSaturday(props.saturday);
        setSunday(props.sunday);
        setErrors({});
    };

    const handleClose = () => {
        setOpen(false);
    };

    let scheduleData = {
        id: props.id,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
    }

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(scheduleData)
        const res = dispatch(editWorkerSchedule(scheduleData))
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

    let day_of_week_elem = [
        {day_value: monday, day_label: t('form.monday') + ": ", day_method: setMonday},
        {day_value: tuesday, day_label: t('form.tuesday') + ": ", day_method: setTuesday},
        {day_value: wednesday, day_label: t('form.wednesday') + ": ", day_method: setWednesday},
        {day_value: thursday, day_label: t('form.thursday') + ": ", day_method: setThursday},
        {day_value: friday, day_label: t('form.friday') + ": ", day_method: setFriday},
        {day_value: saturday, day_label: t('form.saturday') + ": ", day_method: setSaturday},
        {day_value: sunday, day_label: t('form.sunday') + ": ", day_method: setSunday},
    ]

    return (
        <div>
            <Button onClick={handleClickOpen}>{t('form.update')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Schedule edit form</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here you can edit workers schedule
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="scheduleUpdateForm">
                        <Stack spacing={2} direction={"column"} alignItems={"flex-start"}>
                            <FormGroup>
                                {day_of_week_elem.map((day_of_week) => (
                                    <FormControlLabel sx={{mt: 3}}
                                                      labelPlacement="start"
                                                      control={
                                                          <Checkbox
                                                              checked={day_of_week.day_value}
                                                              onChange={(e) => day_of_week.day_method(e.target.checked)}
                                                              inputProps={{'aria-label': 'controlled'}}
                                                              sx={{color: red[800], '&.Mui-checked': {color: green[600],}}}/>
                                                      }
                                                      label={day_of_week.day_label}/>
                                ))}
                            </FormGroup>
                        </Stack>
                        {Object.entries(errors).map((error) => (
                            error[0] !== "name" && error[0] !== "modifier" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button autoFocus type="submit" form="scheduleUpdateForm">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}