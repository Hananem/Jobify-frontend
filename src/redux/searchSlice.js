// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  blogs: [],
  jobs: [],
  jobSeekerPosts: [],
  events: [],
  users: [],
  status: 'idle',
  error: null
};

// Async thunk for fetching search results
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query) => {
    const response = await axios.get(`https://jobify-kefc.onrender.com/api/search?query=${query}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload.blogs;
        state.jobs = action.payload.jobs;
        state.jobSeekerPosts = action.payload.jobSeekerPosts;
        state.events = action.payload.events;
        state.users = action.payload.users;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default searchSlice.reducer;
