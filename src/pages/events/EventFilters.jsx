import React from 'react';
import { BiSearch, BiMap, BiBuilding, BiCalendar } from 'react-icons/bi';

const EventFilters = ({ filters, handleInputChange, handleResetFilters }) => {
  return (
    <div>
      <div className="flex-center-between relative flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 md:bg-white shadow-none md:dark:shadow-none md:dark:bg-dark-card rounded-lg px-4 py-2">
        {/* Title Filter */}
        <div className="filter relative flex items-center">
          <BiSearch className="text-slate-500 dark:text-slate-300 mr-2" />
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            placeholder="title"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
          />
        </div>

        {/* Location Filter */}
        <div className="filter relative flex items-center">
          <BiMap className="text-slate-500 dark:text-slate-300 mr-2" />
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="location"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
          />
        </div>

        {/* Company Filter */}
        <div className="filter relative flex items-center">
          <BiBuilding className="text-slate-500 dark:text-slate-300 mr-2" />
          <input
            type="text"
            name="company"
            value={filters.company}
            onChange={handleInputChange}
            placeholder="company"
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
          />
        </div>

        {/* Date Filter */}
        <div className="filter relative flex items-center">
          <BiCalendar className="text-slate-500 dark:text-slate-300 mr-2" />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
            className="border-none outline-none placeholder:text-sm bg-inherit w-full text-slate-500 dark:text-slate-300"
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

export default EventFilters;

