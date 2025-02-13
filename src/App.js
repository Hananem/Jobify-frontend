import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import ForgotPassword from './pages/forms/ForgotPassword';
import ResetPassword from './pages/forms/ResetPassword';
import Home from "./home/Home";
import Profile from "./pages/profile/Profile";
import JobDetails from "./pages/jobs/JobDetails";
import AddJobForm from "./pages/jobs/AddJobForm";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import JobSeekers from "./pages/jobseekers/JobSeekers";
import Events from "./pages/events/Events";
import CreateJobSeekerPost from "./pages/jobseekers/CreateJobSeekerPost";
import UpdateProfile from "./pages/profile/UpdateProfile";
import History from "./pages/profile/History";
import JobListingContainer from "./pages/jobs/JobListingContainer";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import SearchResults from "./pages/SearchResults";
import Dashboard from "./pages/admin/Dashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import CreateBlog from "./pages/admin/CreateBlog";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/create-job" element={<AddJobForm />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/jobseekers" element={<JobSeekers />} />
        <Route path="/create-jobseeker" element={<CreateJobSeekerPost />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/jobs" element={<JobListingContainer />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/history" element={<History/>} />
        {/* Dashboard and its sub-routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
