import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  productCount: '',
  resultPerPage: '',
};

//action to get all products
export const getProducts = createAsyncThunk(
  'products/get',
  async ({ keyword, ...parameter }, thunkAPI) => {
    try {
      return await productService.getProducts(
        keyword ? keyword : '',
        parameter.currentPage ? parameter.currentPage : 1,
        parameter.price ? parameter.price : [0, 500],
        parameter.category ? parameter.category : '',
        parameter.rating ? parameter.rating : 0
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//aton to get product detials
export const getProduct = createAsyncThunk(
  'product/get',
  async (productId, thunkAPI) => {
    try {
      console.log('is working');
      return await productService.getProduct(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// method to export actios and reducers
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;

        state.message = action.payload;
      });
  },
});
export const { reset } = productSlice.actions;

export default productSlice.reducer;
