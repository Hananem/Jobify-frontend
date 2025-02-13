import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobSeekers, filterJobSeekers } from '../../redux/jobSeekerPostsSlice';
import JobSeekerFilters from './JobSeekerFilters';
import JobSeekerPosts from './JobSeekerPosts';

const JobSeekers = () => {
  const dispatch = useDispatch();
  const { posts = [], status, error, currentPage, totalPages } = useSelector((state) => state.jobSeekerPosts);

  const [filters, setFilters] = useState({
    username: '',
    jobTitle: '',
    skills: '',
    location: '',
  });

  const [limit] = useState(10); // Items per page
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch job seekers based on filters or fetch all if no filters
  useEffect(() => {
    if (
      filters.username !== '' ||
      filters.jobTitle !== '' ||
      filters.skills !== '' ||
      filters.location !== ''
    ) {
      setIsFiltering(true);
      dispatch(filterJobSeekers({ ...filters, page: currentPage, limit }));
    } else {
      setIsFiltering(false);
      dispatch(fetchAllJobSeekers({ page: currentPage, limit }));
    }
  }, [dispatch, currentPage, filters, limit]);

  // Handle input changes for filters
  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Reset filters and fetch all job seekers
  const handleResetFilters = () => {
    setFilters({
      username: '',
      jobTitle: '',
      skills: '',
      location: '',
    });
    dispatch(fetchAllJobSeekers({ page: 1, limit }));
  };

  // Handle page changes
  const handlePageChange = (page) => {
    if (isFiltering) {
      dispatch(filterJobSeekers({ ...filters, page, limit }));
    } else {
      dispatch(fetchAllJobSeekers({ page, limit }));
    }
  };

  return (
    <div className="container mx-auto md:px-[6%]  py-[0.35rem] mt-14">

      <JobSeekerFilters
        filters={filters}
        handleInputChange={handleInputChange}
        handleResetFilters={handleResetFilters}
      />

      <JobSeekerPosts
        posts={posts}
        status={status}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default JobSeekers;






