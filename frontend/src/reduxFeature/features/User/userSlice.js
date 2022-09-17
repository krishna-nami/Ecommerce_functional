import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';
const user = JSON.parse(localStorage.getItem('user'));
// const user = '';

const initialState = {
  user: user ? user : '',
  isError: false,
  isAuth: false,
  isUpdated: false,
  isLoading: false,
  isUserDeleted: false,
  message: '',
  users: [],
  aUser: {},
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
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
export const update = createAsyncThunk(
  'auth/update',
  async (user, thunkAPI) => {
    try {
      return await userService.update(user);
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
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (public_id, thunkAPI) => {
    try {
      return await userService.loadUser();
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
export const updatePassword = createAsyncThunk(
  'auth/updatePass',
  async (passObj, thunkAPI) => {
    try {
      console.log(...passObj);
      return await userService.updatePassword(passObj);
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
export const logOut = createAsyncThunk('auth/logout', async () => {
  return await userService.logout();
});
export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
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
export const getAllUsers = createAsyncThunk(
  'admin/get/Users',
  async (_, thunkAPI) => {
    try {
      return await userService.getUsers();
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
export const deleteUser = createAsyncThunk(
  'admin/delete/User',
  async (id, thunkAPI) => {
    try {
      return await userService.deleteAUser(id);
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
export const getAUser = createAsyncThunk(
  'admin/get/User',
  async (id, thunkAPI) => {
    try {
      return await userService.getUser(id);
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
export const updateAUser = createAsyncThunk(
  'admin/update/User',
  async (payload, thunkAPI) => {
    try {
      const id = payload.id;
      const user = payload.myForm;
      return await userService.updateUser(id, user);
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
    reset_delete: (state) => {
      state.isUserDeleted = false;
      state.message = '';
    },
    reset_update: (state) => {
      state.isUpdated = false;
      state.message = '';
    },
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
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.isError = false;
      })
      .addCase(update.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isUpdated = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.isError = false;
        state.isUpdated = false;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.isError = false;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.isUpdated = false;
        state.isError = false;
        state.message = '';
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.user = '';
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = '';

        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      })

      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = '';
        state.aUser = action.payload;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.aUSer = {};
      })
      .addCase(updateAUser.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
        state.isError = false;
        state.aUSer = {};
      })

      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isUpdated = true;
        state.message = action.payload;
      })
      .addCase(updateAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        state.message = action.payload;
        state.aUSer = {};
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isUserDeleted = true;
        state.message = action.payload;
      });
  },
});
export const { reset, reset_delete, reset_update } = authSlice.actions;

export default authSlice.reducer;
