import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jobify-kefc.onrender.com';

// Async thunk for fetching all blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs?page=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching a single blog by ID
export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://jobify-kefc.onrender.com/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating a new blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().user; // Access the user from Redux state
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      formData.append('image', blogData.image); // Assuming 'image' is a file object

      const response = await axios.post(`${API_URL}/api/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: user.token, // Use the token from Redux state
        },
      });

      return response.data; // Return the created blog data
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error response
    }
  }
);


// Async thunk for updating a blog by ID
export const updateBlogById = createAsyncThunk(
  'blogs/updateBlogById',
  async ({ id, blogData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/blogs/${id}`, blogData, {
        headers: {
          Authorization: token, // No 'Bearer' prefix
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a blog by ID
export const deleteBlogById = createAsyncThunk(
  'blogs/deleteBlogById',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}`, {
        headers: {
          Authorization: token, // No 'Bearer' prefix
        },
      });
      return { id }; // Return the ID to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a blog's image by ID
export const updateBlogImageById = createAsyncThunk(
  'blogs/updateBlogImageById',
  async ({ id, imageFile, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.post(`${API_URL}/api/blogs/${id}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token, 
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching blog count
export const fetchBlogCount = createAsyncThunk(
  'blogs/fetchBlogCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs/count`);
      console.log(response.data)
      return response.data; // Assuming the API returns { total: <number> }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the slice
const initialState = {
  blogs: [],
  blog: null,
  status: 'idle',
  error: null,
  total: 0,
  page: 1,
  totalCount: 0,
  pageSize: 10,
  totalPages: 0,
};

// The blog slice
const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchBlogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload.blogs;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchBlogById
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle createBlog
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updateBlogById
      .addCase(updateBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex((blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle deleteBlogById
      .addCase(deleteBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle updateBlogImageById
      .addCase(updateBlogImageById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlogImageById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex((blog) => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index].image = action.payload.image;
        }
      })
      .addCase(updateBlogImageById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBlogCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogCount.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.totalCount = action.payload.count; // Update the total count in the state
      })
      .addCase(fetchBlogCount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the reducer to be used in the store
export default blogSlice.reducer;
