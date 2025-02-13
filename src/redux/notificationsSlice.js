// src/slices/notificationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for fetching and updating notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().user; // Access token directly
    try {
      const response = await axios.get('https://jobify-kefc.onrender.com/api/notifications', {
        headers: { Authorization: user.token },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markNotificationsAsRead = createAsyncThunk(
  'notifications/markNotificationsAsRead',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().user; // Access token directly
    try {
      await axios.put('https://jobify-kefc.onrender.com/api/notifications/mark-read', null, {
        headers: { Authorization: user.token },
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Notifications slice
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notifications = action.payload.notifications;
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(markNotificationsAsRead.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markNotificationsAsRead.fulfilled, (state) => {
        state.status = 'succeeded';
        state.notifications = state.notifications.map(notification => ({
          ...notification,
          read: true,
        }));
        state.unreadCount = 0;
      })
      .addCase(markNotificationsAsRead.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default notificationsSlice.reducer;
