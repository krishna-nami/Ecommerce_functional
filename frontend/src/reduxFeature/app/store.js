import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/prouctSlice';
import authReducer from '../features/User/userSlice';
import cartReducer from '../features/order/cartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});
export default store;
