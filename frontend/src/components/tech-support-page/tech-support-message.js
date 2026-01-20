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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import WorkerMenu from "./tech-support-message-menu";
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

export default function TechSupportMessage(props) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
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

    let message_data = props

    return (
        <Card sx={{maxWidth: 500}}>
            <CardHeader
                action={ <WorkerMenu {...props}/>}
                title={`${message_data.title}`}
            />
            <CardContent>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.status')}: {message_data.status}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.admin_response')}: {message_data.admin_response ? message_data.admin_response : t('form.no_response')}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Typography variant="body2" textAlign={"left"}>
                    {t('form.detail')}
                </Typography>
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
                <CardContent>
                    <Typography variant="body2" textAlign={"left"}>
                        {t('form.title')}: {message_data.title}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        {t('form.description')}: {message_data.description}
                    </Typography>
                    <Divider sx={{mt: 2, mb: 2}}/>
                    <Typography variant="body2" textAlign={"left"}>
                        {t('form.date_created')}: {message_data.localized_created_at}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}