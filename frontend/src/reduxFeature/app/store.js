import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/prouctSlice';
import authReducer from '../features/User/userSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});
export default store;
