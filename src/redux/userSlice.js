import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { getState, rejectWithValue }) => {
    const token = getState().user.user.token;
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      console.log(data)
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    const response = await fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials) => {
    const response = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  }
);




export const markInterested = createAsyncThunk(
  "user/markInterested",
  async (eventId, { getState, rejectWithValue }) => {
    const token = getState().user.user.token; // Accessing token from current state
    try {
      // Make API request using token and other data
      const response = await fetch('http://localhost:4000/api/events/mark-interested', {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });

      // Handle response, update state if needed
      if (!response.ok) {
        throw new Error('Failed to mark event as interested');
      }
      const data = await response.json();
      console.log('API response data:', data);
      // Update Redux state or return data
      return data.interestedEvents;
    } catch (error) {
      // Handle errors, optionally return an error message
      return rejectWithValue(error.message);
    }
  }
);
// Create an async thunk for saving a job
export const saveJob = createAsyncThunk(
  'user/saveJob',
  async (jobId, { getState, rejectWithValue }) => {
    const token = getState().user.user.token; // Accessing token from current state
    // Adjust according to your state structure
    try {
      const response = await axios.post(
        `http://localhost:4000/api/jobs/${jobId}/save`,
        {}, // Empty body
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.savedJobs !== undefined) {
        return response.data.savedJobs; // Return the updated savedJobs array
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const toggleHireJobSeekerPost = createAsyncThunk(
  'user/toggleHireJobSeekerPost',
  async ({ jobSeekerPostId, hiredUserId, employerId }, { getState, rejectWithValue }) => {
    const token = getState().user.user.token;
    try {
      const response = await axios.post(
        'http://localhost:4000/api/jobSeeker/hire',
        { jobSeekerPostId, hiredUserId, employerId },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data)
      console.log(response.data.hiredJobPosts)

      return response.data.hiredJobPosts; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'profile/uploadProfilePhoto',
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/users/profile/photo',
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

// Thunk to delete a user profile (using `Authorization` header without 'Bearer')
export const deleteUser = createAsyncThunk(
  'profile/deleteUser',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/users/${id}`, {
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


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateProfilePhoto: (state, action) => {
      if (state.user && state.user.user) {
        state.user.user.profilePhoto = action.payload; // Update profilePhoto correctly in nested user object
        localStorage.setItem("user", JSON.stringify(state.user)); // Save the updated user object to localStorage
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        // After successful deletion, clear the user from the state and localStorage
        localStorage.removeItem("user");
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(markInterested.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && state.user.user) {
          state.user.user.interestedEvents = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(markInterested.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && state.user.user) {
          state.user.user.savedJobs = action.payload;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleHireJobSeekerPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleHireJobSeekerPost.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && state.user.user) {
          state.user.user.hiredJobPosts = action.payload; 
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(toggleHireJobSeekerPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && state.user.user) {
          state.user.user.profilePhoto = action.payload.profilePhoto; 
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
  },
});

export const { logout, setUser,updateProfilePhoto } = userSlice.actions;

export default userSlice.reducer;

