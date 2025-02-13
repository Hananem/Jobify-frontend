
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';
import jobReducer from './jobSlice';
import blogReducer from './blogSlice';
import eventsReducer from './eventsSlice'; // Correctly import eventsReducer
import jobSeekerPostsReducer from './jobSeekerPostsSlice';
import searchReducer from './searchSlice';
import notificationsReducer from './notificationsSlice';
import uiReducer from './uiSlice';
import chartsReducer from './chartsSlice';
import passwordResetReducer from './passwordResetSlice';
// Create the Redux store
const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    profile: profileReducer,
    jobs: jobReducer,
    blogs: blogReducer,
    events: eventsReducer, // Use eventsReducer here
    jobSeekerPosts: jobSeekerPostsReducer,
    search: searchReducer,
    notifications: notificationsReducer,
    charts: chartsReducer,
    passwordReset: passwordResetReducer,
  },
});

export default store;
