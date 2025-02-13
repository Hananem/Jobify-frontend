
import React from 'react';
import JobViewsByTypeChart from './charts/JobViewsByTypeChart';
import JobApplicationsByTypeChart from './charts/JobApplicationsByTypeChart';
import UserRegistrationsOverTimeChart from './charts/UserRegistrationsOverTimeChart';
import JobSeekerPostsByExperienceLevelChart from './charts/JobSeekerPostsByExperienceLevelChart';
import JobViewsOverTimeChart from './charts/JobViewsOverTimeChart';
import JobApplicationsByType from './charts/JobApplicationsByType';
import JobPostingsByEmploymentType from './charts/JobPostingsByEmploymentType';
import HiringsOverTime from './charts/HiringsOverTime';
import JobCount from "./JobCount";
import JobSeekerCount from "./JobSeekerCount";
import EventCount from "./EventCount";
import BlogCount from './BlogCount';
const Main = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <JobCount/>
      <JobSeekerCount/> 
      <EventCount/> 
      <BlogCount />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views by Type</h2>
          <JobViewsByTypeChart />
        </div>
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views by Type</h2>
          <JobApplicationsByType />
        </div>
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views by Type</h2>
          <JobViewsByTypeChart />
        </div>
        
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views by Type</h2>
          <JobPostingsByEmploymentType />
        </div>
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views by Type</h2>
          <HiringsOverTime />
        </div>
        
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">User Registrations Over Time</h2>
          <UserRegistrationsOverTimeChart />
        </div>
        
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Seeker Posts by Experience Level</h2>
          <JobSeekerPostsByExperienceLevelChart />
        </div>
        
        <div className="card p-4 shadow rounded">
          <h2 className="text-xl mb-2">Job Views Over Time</h2>
          <JobViewsOverTimeChart />
        </div>
      </div>
    </div>
  );
};

export default Main;
