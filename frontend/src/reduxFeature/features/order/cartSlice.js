import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState,
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((item) => item.id === newItem.id);
      const cartItems = existItem
        ? state.cartItems.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    },
    removeFromCart: (state, action) => {
      const cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cartItems,
      };
    },
    addShipping: (state, action) => {
      localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    removeAll: (state, action) => {},
  },
  extraReducers: (builder) => {},
});
export const { addToCart, removeFromCart, addShipping } = cartSlice.actions;
export default cartSlice.reducer;
