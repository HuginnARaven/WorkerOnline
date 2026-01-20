import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTechSupportMessages} from "../../store/user/techSupport/techSupportAction";
import TechSupportMessage from "./tech-support-message";
import TechSupportCreateForm from "./tech-support-create-form";
import {Container} from "@mui/material";
import {useTranslation} from "react-i18next";

export default function TechSupportPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')


    useEffect(() => {
        dispatch(getTechSupportMessages(token));
    }, [])

    const tech_support_messages = useSelector((state) => state.tech_support.tech_support_messages_list);
    const is_loading = useSelector((state) => state.tech_support.is_loading);

    return (
        <Container  maxWidth="xl">
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                    <TechSupportCreateForm/>
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                    {tech_support_messages.map((tech_support_message) => (
                        <Grid>
                            <TechSupportMessage {...tech_support_message}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}