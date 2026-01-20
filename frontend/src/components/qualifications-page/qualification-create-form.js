import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {createQualification} from "../../store/company/qualifications/qualificationsAction";
import {useTranslation} from "react-i18next";

export default function QualificationCreateForm(props) {
    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [modifier, setModifier] = React.useState(null);
    const [errors, setErrors] = useState({});

    const { t } = useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName(null);
        setModifier(null);
        setErrors({});
    };

    let qualificationData = {
        name: name,
        modifier: modifier,
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(qualificationData)
        const res = dispatch(createQualification(qualificationData));
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
            <Fab sx={{position: 'fixed', bottom: 16, right: 16,}} aria-label={'Add'} color={'primary'} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('QualificationPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('QualificationPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="qualificationCreateForm">
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="qualificationCreateForm">Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}