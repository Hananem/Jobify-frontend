import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllJobSeekers = createAsyncThunk(
  'jobSeekerPosts/fetchAll',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jobify-kefc.onrender.com/api/jobseeker', {
        params: { page, pageSize: limit },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk to filter job seekers with pagination
export const filterJobSeekers = createAsyncThunk(
  'jobSeekerPosts/filter',
  async ({ username, jobTitle, skills, location, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jobify-kefc.onrender.com/api/jobseeker/filter', {
        params: { username, jobTitle, skills, location, page, pageSize: limit },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const createJobSeekerPost = createAsyncThunk(
  'jobSeekerPosts/createJobSeekerPost',
  async (post, { getState, rejectWithValue }) => {
    const { user } = getState().user; // Access token directly
    try {
      const response = await axios.post('https://jobify-kefc.onrender.com/api/jobSeeker', post, {
        headers: {   Authorization: user.token, },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateJobSeekerPost = createAsyncThunk(
  'jobSeekerPosts/updateJobSeekerPost',
  async ({ postId, updateData }, { getState, rejectWithValue }) => {
    const { user } = getState().user; // Access token directly
    try {
      const response = await axios.put(`https://jobify-kefc.onrender.com/api/jobSeeker/${postId}`, updateData, {
        headers: { Authorization: user.token },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteJobSeekerPost = createAsyncThunk(
  'jobSeekerPosts/deleteJobSeekerPost',
  async (postId, { getState, rejectWithValue }) => {
    const { token } = getState().user.user;
    console.log(token) // Access token directly
    try {
      await axios.delete(`https://jobify-kefc.onrender.com/api/jobSeeker/${postId}`, {
        headers: { Authorization: token },
      });
      return postId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Thunk to fetch job seeker posts count
export const fetchJobSeekerCount = createAsyncThunk(
  'jobSeekerPosts/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jobify-kefc.onrender.com/api/jobseeker/count');
      return response.data; 
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



// Create the slice
const jobSeekerPostsSlice = createSlice({
  name: 'jobSeekerPosts',
  initialState: {
    posts: [],
    totalPages: 1,
    currentPage: 1,
    totalPosts: 0,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching all job seekers
      .addCase(fetchAllJobSeekers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllJobSeekers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllJobSeekers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })

      // Handle filtering job seekers
      .addCase(filterJobSeekers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterJobSeekers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(filterJobSeekers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(createJobSeekerPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createJobSeekerPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createJobSeekerPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateJobSeekerPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJobSeekerPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index >= 0) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updateJobSeekerPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteJobSeekerPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJobSeekerPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deleteJobSeekerPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchJobSeekerCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobSeekerCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming you want to save the totalPosts in the state, you may want to define it in your initial state
        state.totalPosts = action.payload.totalPosts; // Store the total posts count
      })
      .addCase(fetchJobSeekerCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default jobSeekerPostsSlice.reducer;
