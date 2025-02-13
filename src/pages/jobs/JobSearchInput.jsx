import React from 'react';
import { BiSearch, BiMap, BiBriefcase } from 'react-icons/bi';

const JobSearchInput = ({ filters, handleInputChange, handleResetFilters }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 rounded-lg md:bg-white dark:bg-dark-card md:shadow-md dark:shadow-none">
      {/* Job Title Input */}
      <div className="filter relative flex items-center">
      <BiSearch className="text-slate-500 dark:text-slate-300 mr-2"/>
        <input
          type="text"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleInputChange}
          placeholder="Job Title"
          className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
        />
      </div>

      {/* Location Input */}
      <div className="filter relative flex items-center">
      <BiMap className="text-slate-500 dark:text-slate-300 mr-2" />
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
        />
      </div>

      {/* Job Type Input */}
      <div className="filter relative flex items-center">
      <BiBriefcase className="text-slate-500 dark:text-slate-300 mr-2" />
        <input
          type="text"
          name="jobType"
          value={filters.jobType}
          onChange={handleInputChange}
          placeholder="Job Type"
          className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
        />
      </div>

      {/* Reset Button */}
      <div className="flex items-center justify-center w-full md:w-auto">
        <button
          onClick={handleResetFilters}
          className="btn btn-primary "
        >
          Reset 
        </button>
      </div>
    </div>
  );
};

export default JobSearchInput;

