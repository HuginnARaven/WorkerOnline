import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {createTechSupportMessage} from "../../store/user/techSupport/techSupportAction";
import {useTranslation} from "react-i18next";
import {createOrder} from "../../store/company/orders/ordersAction";
import {redirect, useNavigate} from "react-router-dom";

export default function OrderCreateForm() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const [address, setAddress] = React.useState('');
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAddress('');
        setErrors({});
    };

    let orderData = {
        address_of_delivery: address,
    }

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = dispatch(createOrder(orderData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleClose();
                navigate("/offers");
            }
        });
    };

    return (
        <div>
            <Button size="small" onClick={handleClickOpen}>By now</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('OrdersPage.create_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('OrdersPage.create_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="messageCreateForm">
                        <TextField
                            autoFocus
                            error={errors.address}
                            helperText={errors.address}
                            margin="dense"
                            id="order-address"
                            label={t('form.address')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                        />

                        {Object.entries(errors).map((error) => (
                            error[0] !== "address" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('form.cancel')}</Button>
                    <Button type="submit" form="messageCreateForm">{t('form.create')}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}