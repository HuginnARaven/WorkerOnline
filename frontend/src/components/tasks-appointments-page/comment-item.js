import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Paper, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../store/company/tasksAppointments/tasksAppointmentsAction";
import {useState} from "react";

export default function CommentItem(comment) {
    const [errors, setErrors] = useState({});
    const curr_user = useSelector((state) => state.user.username);

    const dispatch = useDispatch();

    let CommentData = {
        id: comment.id,
        task_appointment: comment.task_appointment
    }

    const handleDelete = () => {
        const res = dispatch(deleteComment(CommentData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }
        });
    };

    return (
        <Stack direction={comment.username === curr_user ? "row-reverse" : "row"}
               justifyContent={"flex-start"}
               alignContent={"flex-end"}
               p={1}
               sx={comment.username === curr_user ? {ml: 3} : {mr: 3}}
        >
            <Typography>
                {comment.username}
            </Typography>
            <Paper sx={comment.username === curr_user ? {mr: 1, p:1} : {ml: 1, p:1}} elevation={3}>
                <Typography>
                    {comment.text}
                </Typography>
            </Paper>
            {comment.username === curr_user ? <IconButton disableRipple edge={"start"} onClick={handleDelete}><DeleteIcon color={"error"}/></IconButton> : null}
        </Stack>
    );
}