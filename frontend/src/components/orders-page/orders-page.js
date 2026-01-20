import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Container} from "@mui/material";
import {getOrders} from "../../store/company/orders/ordersAction";
import OrderItem from "./order-item";


export default function OrdersPage() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token')


    useEffect(() => {
        dispatch(getOrders(token));
    }, [])

    const orders = useSelector((state) => state.orders.orders_list);
    const is_loading = useSelector((state) => state.orders.is_loading);

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
                    {/*<TechSupportCreateForm/>*/}
                </Grid>
                <Grid
                    container
                    spacing={3}
                    direction={'row'}
                    mt={'30px'}
                    justifyContent="center"
                >
                    {orders.map((order) => (
                        <Grid>
                            <OrderItem {...order}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}