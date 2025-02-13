import React from 'react';
import { BiSearch, BiMap, BiBriefcase } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import { CiUser } from "react-icons/ci";
import { IoBrushOutline } from "react-icons/io5";
import { MdWorkOutline  } from "react-icons/md";
const JobSeekerFilters = ({ filters, handleInputChange, handleResetFilters }) => {
  return (
    <div>
      <div className="flex-center-between relative flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 md:bg-white shadow-none md:dark:shadow-none md:dark:bg-dark-card rounded-lg px-4 py-2">
        {/* Username Filter */}
        <div className="filter relative">
          <input
            type="text"
            name="username"
            value={filters.username}
            onChange={handleInputChange}
            placeholder="name"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
          />
          <CiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-300" />

        </div>

        {/* Job Title Filter */}
        <div className="filter relative">
          <input
            type="text"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleInputChange}
            placeholder="job title"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
          />
          <MdWorkOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-300" />

        </div>

        {/* Skills Filter */}
        <div className="filter relative">
          <input
            type="text"
            name="skills"
            value={filters.skills}
            onChange={handleInputChange}
            placeholder="skills"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
          />
          <IoBrushOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-300" />

        </div>

        {/* Location Filter */}
        <div className="filter relative">
          <BiMap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-300" />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="location"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300 pl-10"
          />
          
        </div>

        {/* Reset Button */}
        <div className="self-center">
          <button className="btn btn-primary" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerFilters;



