import * as React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider";
import dayjs from "dayjs";
import {DateTimeField} from "@mui/x-date-pickers";
import {green, red} from "@mui/material/colors";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import TaskDetailedForm from "./task-detailed-form";
import WorkerDetailedForm from "./worker-detailed-form";
import AppointmentCommentForm from "./appointment-comment-form";
import {useTranslation} from "react-i18next";

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function TaskAppointmentItem(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { t } = useTranslation();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let appointment_data = props

    return (
        <Card sx={{maxWidth: 500}}>
            <CardHeader
                title={appointment_data.task_info.title}
            />
            <CardContent>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.worker')}: {appointment_data.worker_info.first_name} {appointment_data.worker_info.last_name}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.is_done')}: {appointment_data.is_done ? (
                        <>{t('form.yes')}<CheckBoxIcon fontSize={"small"} sx={{color: green[500]}}/></>) :
                    (<>{t('form.no')}<DisabledByDefaultRoundedIcon fontSize={"small"} sx={{color: red[500]}}/></>)
                }
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.status')}: {appointment_data.status}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <DateTimeField
                    label={t('form.time_start')}
                    value={dayjs(appointment_data.time_start)}
                    format="LLL"
                    size={"small"}
                />
                {appointment_data.time_end ? (
                    <>
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <DateTimeField
                            label={t('form.time_end')}
                            value={dayjs(appointment_data.time_end)}
                            format="LLL"
                            size={"small"}
                        />
                    </>
                ) : (<Divider sx={{mt: 2, mb: 2}}/>)
                }

            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <TaskDetailedForm {...appointment_data.task_info}/>
                <WorkerDetailedForm {...appointment_data.worker_info}/>
                <AppointmentCommentForm appointment_id={appointment_data.id} comments={appointment_data.comments}/>
            </Collapse>
        </Card>
    );
}