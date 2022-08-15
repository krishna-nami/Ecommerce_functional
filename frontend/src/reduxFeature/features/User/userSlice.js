import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
const user = JSON.parse(localStorage.getItem('user'));
// const user = '';

const initialState = {
  user: user ? user : '',
  isError: false,
  isAuth: false,
  isLoading: false,
  message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user);
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const logOut = createAsyncThunk('auth/logout', async () => {
  return await userService.logout();
});
export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    console.log(newUser);
    try {
      return await userService.register(newUser);
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
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isError = false;
        state.message = '';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.user = '';
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
