import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, fetchFilteredJobs } from '../../redux/jobSlice';
import JobSearchInput from './JobSearchInput';
import FilterSidebar from './FilterSidebar';
import JobListing from './JobListing';
import { FiDelete } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";
import { openFilterMenu, closeFilterMenu } from "../../redux/uiSlice";

const JobListingContainer = () => {
  const dispatch = useDispatch();
  const { jobs, status, error, totalPages, currentPage } = useSelector((state) => state.jobs);
  const isFilterMenuOpen = useSelector((state) => state.ui.isFilterMenuOpen);

  const handleCloseFilterMenu = (e) => {
    if (e.target.classList.contains("filter-modal")) {
      dispatch(closeFilterMenu());
    }
  };

  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',         // Search input
    experienceLevel: [],
    employmentType: [],
    educationLevel: [],
  });

  // Fetch jobs based on filters or fetch all jobs if no filters are applied
  useEffect(() => {
    if (
      filters.jobTitle !== '' ||
      filters.location !== '' ||
      filters.jobType !== '' ||
      filters.experienceLevel.length > 0 ||
      filters.employmentType.length > 0 ||
      filters.educationLevel.length > 0
    ) {
      dispatch(fetchFilteredJobs({ ...filters, page: currentPage }));
    } else {
      dispatch(fetchJobs({ page: currentPage }));
    }
  }, [dispatch, currentPage, filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    // Dispatch filtered jobs on input change for search fields like job title and location
    dispatch(fetchFilteredJobs({ ...updatedFilters, page: 1 })); // Reset page to 1 when searching
  };

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...filters,
      [name]: filters[name].includes(value)
        ? filters[name].filter((item) => item !== value)
        : [...filters[name], value],
    };
    setFilters(updatedFilters);
    dispatch(fetchFilteredJobs({ ...updatedFilters, page: currentPage })); // Dispatch for checkbox input
  };

  const handleResetFilters = () => {
    setFilters({
      jobTitle: '',
      location: '',
      jobType: '',         // Reset search inputs and filters
      experienceLevel: [],
      employmentType: [],
      educationLevel: [],
    });
    dispatch(fetchJobs({ page: 1 })); // Fetch all jobs again and reset to the first page
  };

  const handlePageChange = (page) => {
    if (
      filters.jobTitle !== '' ||
      filters.location !== '' ||
      filters.jobType !== '' ||
      filters.experienceLevel.length > 0 ||
      filters.employmentType.length > 0 ||
      filters.educationLevel.length > 0
    ) {
      dispatch(fetchFilteredJobs({ ...filters, page }));
    } else {
      dispatch(fetchJobs({ page }));
    }
  };

  return (
    <div className="container mx-auto px-[2%] md:px-[6%]  py-[0.35rem]">
      
<div className="mt-14">
<JobSearchInput
        filters={filters}
        handleInputChange={handleInputChange}
        handleResetFilters={handleResetFilters} 
      />
</div>
   
<div className="mt-8">
<div className="grid md:grid-cols-3 gap-x-14">
        <div className="md:col-span-1 row-start-3 md:row-start-auto h-fit md:sticky top-0">
          <div
            className={`filter-modal ${isFilterMenuOpen ? "open" : ""}`}
            onClick={handleCloseFilterMenu}
          >
            <div className={`filter-dialog ${isFilterMenuOpen ? "open" : ""}`}>
              <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                <p className="uppercase">Filters</p>
                <div
                  className="icon-box md:hidden"
                  onClick={() => dispatch(closeFilterMenu())}
                >
                  <FiDelete />
                </div>
              </div>
              {/* Replacing Filters with FilterSidebar */}
              <FilterSidebar 
                filters={filters} 
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="md:col-span-2 mt-5 md:mt-0 h-fit md:sticky top-0">
          <div
            className="flex-align-center gap-4"
            onClick={() => dispatch(openFilterMenu())}
          >
            <div className="md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
              <BiFilterAlt />
            </div>
            <h3 className="text-sm">Showing Jobs</h3>
          </div>
          
          {/* JobListing Component */}
          <JobListing
            jobs={jobs}
            status={status}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
</div>
     
     
    </div>
  );
};

export default JobListingContainer;



