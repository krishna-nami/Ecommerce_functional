import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/prouctSlice';
import authReducer from '../features/User/userSlice';
import cartReducer from '../features/order/cartSlice';
import orderReducer from '../features/order/orderSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
