import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import {ButtonGroup} from "@mui/material";
import Paper from "@mui/material/Paper";
import QualificationUpdateForm from "./qualification-uppdate-form";
import QualificationDeleteForm from "./qualification-delete-form";
import {useTranslation} from "react-i18next";

export default function QualificationItem(props) {
    const { t } = useTranslation();

    const qualification = props
    return (
        <Paper sx={{mt: 3}} key={`qualificationItem-${qualification.id}`} elevation={3}>
            <Stack direction="row"
                   justifyContent="space-around"
                   alignItems="center"
                   spacing={2}
                   mt={2}
                   mb={2}>
                <Typography variant="subtitle1">{t('form.name')}: {qualification.name}</Typography>
                <Typography variant="subtitle1">{t('form.modifier')}: {qualification.modifier}</Typography>

                <ButtonGroup variant="text" aria-label="outlined primary button group">
                    <QualificationUpdateForm {...props}/>
                    <QualificationDeleteForm {...props}/>
                </ButtonGroup>
            </Stack>
        </Paper>
    );
}