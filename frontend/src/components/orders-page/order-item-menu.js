import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Alert from "@mui/material/Alert";
import {useTranslation} from "react-i18next";
import {deleteOrder, editOrder} from "../../store/company/orders/ordersAction";

export default function OrderItemMenu(props) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

    const order_data = props
    const [delAddress, setDelAddress] = React.useState("");
    const [address, setAddress] = React.useState(props.address_of_delivery);
    const [errors, setErrors] = useState({});

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEditForm = () => {
        setAnchorEl(null);
        setOpenEditForm(true);
    };

    const handleCloseEditForm = () => {
        setAnchorEl(null);
        setAddress(order_data.address);
        setOpenEditForm(false);
    };

    const handleOpenDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(true);
    };

    const handleCloseDeleteForm = () => {
        setAnchorEl(null);
        setOpenDeleteForm(false);
        setDelAddress("")
        setErrors({});
    };

    const handleEditClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenEditForm();
    };
    const handleDeleteClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpenDeleteForm();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let orderData = {
        id: order_data.id,
        address_of_delivery: address,
    }

    const dispatch = useDispatch();

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        console.log(orderData)
        const res = dispatch(editOrder(orderData))
        res.then((value) => {
            console.log(value)
            if (value.error){
                let errorMsg = JSON.parse(value.payload)
                setErrors(errorMsg)
                console.log(errors)
            }else {
                handleCloseEditForm();
            }
        });
    };

    const handleSubmitDelete = (e) => {
        e.preventDefault();
        if (props.address_of_delivery !== delAddress) {
            setErrors({delAddress: "Incorrect address!"})
        }else {
            const res = dispatch(deleteOrder(orderData.id))
            res.then((value) => {
                console.log(value)
                if (value.error){
                    let errorMsg = JSON.parse(value.payload)
                    setErrors(errorMsg)
                    console.log(errors)
                }else {
                    handleCloseDeleteForm();
                }
            });
        }
    };

    return (
        <div>
            <IconButton aria-label="settings"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEditClick}>{t('form.update')}</MenuItem>
                <MenuItem onClick={handleDeleteClick}>{t('form.delete')}</MenuItem>
            </Menu>
            <Dialog open={openEditForm} onClose={handleClose}>
                <DialogTitle>{t('OrdersPage.edit_form_title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('OrdersPage.edit_form_description')}
                    </DialogContentText>
                    <form onSubmit={handleSubmitEdit} id="messageEditForm">
                        <TextField
                            autoFocus
                            error={errors.address_of_delivery}
                            helperText={errors.address_of_delivery}
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
                            error[0] !== "address_of_delivery" ? (
                                <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>) : null
                        ))}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditForm}>{t('form.cancel')}</Button>
                    <Button type="submit" form="messageEditForm">{t('form.save')}</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDeleteForm}
                onClose={handleClose}
                aria-labelledby="alert-message-delete-title"
                aria-describedby="alert-message-delete-description"
            >
                <DialogTitle id="alert-worker-delete-title">
                    {`${t('form.order')} #${order_data.id}`}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmitDelete} id={`deleteMessageForm-${orderData.id}`}>
                        <DialogContentText id="alert-worker-delete-description">
                            {t('OrdersPage.delete_form_description_1')}
                            <p>{t('OrdersPage.delete_form_description_2')}</p>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            error={errors.delAddress}
                            helperText={errors.delAddress}
                            margin="dense"
                            id="order-address"
                            label={t('form.address')}
                            type="text"
                            fullWidth
                            variant="standard"
                            value={delAddress}
                            onChange={(e)=> {setDelAddress(e.target.value)}}
                        />
                    </form>
                    {Object.entries(errors).map((error) => (
                            <Alert severity="error" sx={{mt: 1}}>{error[1]}</Alert>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDeleteForm}>{t('form.cancel')}</Button>
                    <Button color={"error"} type="submit" form={`deleteMessageForm-${orderData.id}`}>
                        {t('form.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}