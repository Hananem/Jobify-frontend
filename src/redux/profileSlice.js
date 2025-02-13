import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  'profile/fetchAllUsers',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://jobify-kefc.onrender.com/api/users?page=${page}&limit=${limit}`);
      return response.data; // This should include totalUsers, totalPages, and users
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch a user by ID
export const fetchUserById = createAsyncThunk(
  'profile/fetchUserById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://jobify-kefc.onrender.com/api/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to update a user profile (using `Authorization` header without 'Bearer')
export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://jobify-kefc.onrender.com/api/users/${id}`, updatedData, {
        headers: {
          Authorization: token, // Authorization header with token only, no 'Bearer'
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to delete a user profile (using `Authorization` header without 'Bearer')
export const deleteUser = createAsyncThunk(
  'profile/deleteUser',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://jobify-kefc.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: token, // Authorization header with token only, no 'Bearer'
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async ({ jobData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://jobify-kefc.onrender.com/api/jobs/postJob', jobData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token, 
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadProfilePhoto',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://jobify-kefc.onrender.com/api/users/profile/photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token, // Using token without 'Bearer'
          },
        }
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Profile slice
const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    users: [],
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all users
    builder
    .addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users; // Update to just get users
      state.totalUsers = action.payload.totalUsers; // Store totalUsers
      state.totalPages = action.payload.totalPages; // Store totalPages
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.profilePhoto = action.payload.profilePhoto;
        }
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

           // Add job to user's postedJobs
           .addCase(addJob.fulfilled, (state, action) => {
            state.loading = false;
            const newJob = action.payload; // This is the new job returned from the backend
            state.user.postedJobs.push(newJob._id); // Add job ID to user's postedJobs array
          })
          .addCase(addJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; // Handle errors
          });
  },
});

// Export actions for resetting error
export const { resetError } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
