import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  product: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isDelete: false,
  isUpdated: false,
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
export const submitReview = createAsyncThunk(
  'review/post',
  async (data, thunkAPI) => {
    try {
      return await productService.createReview(data);
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

// action to get all admin products
export const getAllProducts = createAsyncThunk(
  'admin/products',
  async (_, thunkAPI) => {
    try {
      return await productService.getAdminProducts();
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
export const deleteProduct = createAsyncThunk(
  'admin/delete/product',
  async (id, thunkAPI) => {
    try {
      console.log('working' + id);
      return await productService.deleteAProduct(id);
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

//create a Product
export const createProduct = createAsyncThunk(
  'admin/create/product',
  async (data, thunkAPI) => {
    try {
      return await productService.createAProduct(data);
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
export const updateProduct = createAsyncThunk(
  'admin/update/product',
  async (data, thunkAPI) => {
    try {
      return await productService.updateAProduct(data);
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
    reset_delete: (state) => {
      state.isDelete = false;
    },
    reset_product: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.isLoading = false;
      state.isUpdated = false;
    },
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
        state.isSuccess = false;
        state.product = {};
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
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = '';
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = '';
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isError = false;
        state.message = '';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isUpdated = true;
        state.message = '';
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isUpdated = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDelete = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, reset_delete, reset_product } = productSlice.actions;

export default productSlice.reducer;
