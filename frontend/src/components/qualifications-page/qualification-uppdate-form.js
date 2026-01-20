import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Tooltip} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {editQualification} from "../../store/company/qualifications/qualificationsAction";
import {useTranslation} from "react-i18next";

export default function QualificationUpdateForm(props) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(props.name);
    const [modifier, setModifier] = React.useState(props.modifier);
    const [errors, setErrors] = useState({});

    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(props.name);
        setModifier(props.modifier);
        setErrors({});
    };

    let qualificationData = {
        id: props.id,
        name: name,
        modifier: modifier,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(qualificationData)
        const res = dispatch(editQualification(qualificationData));
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

    return (
        <div>
            <Button onClick={handleClickOpen}>{t('form.update')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('QualificationPage.edit_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('QualificationPage.edit_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="qualificationUpdateForm">
                        <TextField
                            autoFocus
                            error={errors.name}
                            helperText={errors.name}
                            margin="dense"
                            id="qualification-name"
                            label={t('form.name')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={(e)=> {setName(e.target.value)}}
                        />
                        <Tooltip title="The greater qualification the more modifier must be!">
                            <TextField
                                error={errors.modifier}
                                helperText={errors.modifier}
                                margin="dense"
                                id="qualification-modifier"
                                label={t('form.modifier')}
                                type="number"
                                fullWidth
                                variant="standard"
                                value={modifier}
                                onChange={(e)=> {setModifier(e.target.value)}}
                            />
                        </Tooltip>
                        {Object.entries(errors).map((error) => (
                            error[0] !== "name" && error[0] !== "modifier" ? (<Alert severity="error" sx={{mt:1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="qualificationUpdateForm">{t('form.save')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}