import {createSlice} from '@reduxjs/toolkit';
import {getOrders} from "./ordersAction";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders_list: [],
        is_loading: false,
        errors: [],
    },
    reducers: {
        SetOrdersList: (state, action) => {
            state.orders_list = action.payload
        },
        AddOrder: (state, action) => {
            state.orders_list.push(action.payload)
        },
        EditOrder: (state, action) => {
            const indexOfOrder = state.orders_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.orders_list[indexOfOrder] = action.payload;
        },
        DeleteOrder: (state, action) => {
            const indexOfOrder = state.orders_list.findIndex(object => {
                return object.id === action.payload.id;
            });
            state.orders_list.splice(indexOfOrder, 1);
        },
        SetError: (state, action) => {
            state.errors.push(action.payload)
        },
    },
    extraReducers: builder => {
        builder.addCase(getOrders.pending, (state, action) => {
            state.is_loading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.is_loading = false;
        });
    }
})

export const {SetOrdersList, AddOrder, EditOrder, DeleteOrder, SetError} = ordersSlice.actions

export default ordersSlice.reducer