import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
  orders: [],
  order: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  isDelete: false,
  isUpdated: false,
  totalAmount: 0,
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

export const getAllOrders = createAsyncThunk(
  'orders/admin',
  async (_, thunkAPI) => {
    try {
      return await orderService.adminOrders();
    } catch (error) {
      const message =
        (error.respose && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/delete/admin',
  async (id, thunkAPI) => {
    try {
      return await orderService.deleteAOrder(id);
    } catch (error) {
      const message =
        (error.respose && error.respone.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateOrder = createAsyncThunk(
  'order/update/admin',
  async (payload, thunkAPI) => {
    try {
      const id = payload.id;
      const status = payload.myForm;
      return await orderService.updateAOrder(id, status);
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
  reducers: {
    reset_order: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    reset_delete: (state) => {
      state.isDelete = false;
    },
  },
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
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
        state.isError = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = false;
        state.isUpdated = true;
        state.message = action.payload.message;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});
export const { reset_delete, reset_order } = orderSlice.actions;
export default orderSlice.reducer;
