import {createAsyncThunk} from "@reduxjs/toolkit";
import {companyAPI, userAPI} from "../../../utils/api";
import {SetOrdersList, SetError, AddOrder, EditOrder, DeleteOrder} from "./ordersSlice";



export const getOrders = createAsyncThunk(
    'orders/get-all',
    async (token,thunkAPI) => {
        try {
            const token = localStorage.getItem('access_token')
            const ordersData = await companyAPI.getOrders((token));
            thunkAPI.dispatch(SetOrdersList((ordersData)))

            return ordersData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData, thunkAPI) => {
        try {
            const {address_of_delivery} = orderData
            const resOrderCreation = await companyAPI.createOrder({address_of_delivery});

            thunkAPI.dispatch(AddOrder(resOrderCreation))


            return resOrderCreation
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }
            const errorMsg = error.response.data
            thunkAPI.dispatch(SetError(errorMsg))
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const editOrder = createAsyncThunk(
    'orders/edit',
    async (messageData, thunkAPI) => {
        try {
            const {id, address_of_delivery} = messageData

            const reqbody = {
                address_of_delivery: address_of_delivery,
            }

            const editedOrderData = await companyAPI.editOrder(id, reqbody);
            thunkAPI.dispatch(EditOrder((editedOrderData)))

            return editedOrderData
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const deleteOrder = createAsyncThunk(
    'orders/delete',
    async (orderId, thunkAPI) => {
        try {

            const order = {
                id: orderId
            }
            const resDelete = await companyAPI.deleteOrder(orderId);
            thunkAPI.dispatch(DeleteOrder((order)))

            return resDelete
        } catch (err) {
            let error = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)
            return thunkAPI.rejectWithValue(json)
        }
    }
)