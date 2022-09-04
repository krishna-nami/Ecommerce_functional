import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
  orders: [],
  order: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};
export const createOrder = createAsyncThunk(
  'order/post',
  async (order, thunkAPI) => {
    try {
      return await orderService.createOrder(order);
    } catch (error) {
      const message =
        (error.respose && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const viewOrders = createAsyncThunk(
  'orders/get',
  async (_, thunkAPI) => {
    try {
      return await orderService.viewOrders();
    } catch (error) {
      const message =
        (error.respose && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const orderDetails = createAsyncThunk(
  'order/get',
  async (id, thunkAPI) => {
    try {
      return await orderService.orderDetails(id);
    } catch (error) {
      const message =
        (error.respose && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: { orderReset: initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(viewOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
        state.order = {};
      })
      .addCase(viewOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(orderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        state.orders = [];
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.order = {};
      });
  },
});
export const { orderReset } = orderSlice.actions;
export default orderSlice.reducer;
