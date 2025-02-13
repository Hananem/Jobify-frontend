import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for sending reset password link
export const sendResetPasswordLink = createAsyncThunk(
  'passwordReset/sendResetPasswordLink',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/send-reset-password-link', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for validating reset password token
export const getResetPasswordLink = createAsyncThunk(
  'passwordReset/getResetPasswordLink',
  async (resetToken, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/reset-password/${resetToken}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for resetting the password
export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async ({ resetToken, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/reset-password', { resetToken, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState: {
    loading: false,
    error: null,
    message: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendResetPasswordLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetPasswordLink.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(sendResetPasswordLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getResetPasswordLink.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResetPasswordLink.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getResetPasswordLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default passwordResetSlice.reducer;
