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
import ChatIcon from '@mui/icons-material/Chat';
import {Grid, IconButton, Menu, MenuItem, Paper, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {commentAppointment} from "../../store/company/tasksAppointments/tasksAppointmentsAction";
import {useState} from "react";
import Alert from "@mui/material/Alert";
import CommentItem from "./comment-item";
import {useTranslation} from "react-i18next";

export default function AppointmentCommentForm(props) {
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();

    const [new_comment_text, setCommentText] = React.useState('');
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const curr_user = useSelector((state) => state.user.username);

    let newCommentData = {
        text: new_comment_text,
        task_appointment: props.appointment_id
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = dispatch(commentAppointment(newCommentData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                setCommentText("")
            }
        });
    };

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained"
                    sx={{mb: 2, width: "90%"}}>{t('form.comment')} <ChatIcon/></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('AppointmentsPage.comments_title')}</DialogTitle>
                <DialogContent>
                    <Paper sx={{maxHeight: 550, overflow: 'auto'}}>
                        {props.comments.map((comment) => (
                            <CommentItem {...comment}/>
                            ))}
                    </Paper>
                    <form id="commentCreateForm" onSubmit={handleSubmit}>
                        <Stack direction={"row"} mt={2} justifyContent="center">
                            <TextField id="comment text"
                                       label="Text"
                                       variant="outlined"
                                       fullWidth
                                       multiline
                                       value={new_comment_text}
                                       onChange={(e) => setCommentText(e.target.value)}
                            />
                            <Button variant="contained" type="submit"><SendIcon/></Button>
                        </Stack>
                    </form>
                    {Object.entries(errors).map((error) => (
                        <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.close')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}