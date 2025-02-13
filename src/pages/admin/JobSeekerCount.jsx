import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobSeekerCount } from '../../redux/jobSeekerPostsSlice';
import { RiUser3Fill } from "react-icons/ri";

const JobSeekerCount = () => {
  const dispatch = useDispatch();
  const { totalPosts, status, error } = useSelector((state) => state.jobSeekerPosts);

  useEffect(() => {
    dispatch(fetchJobSeekerCount());
  }, [dispatch]);

  return (
    <div className="bg-[#3f5496] text-white relative shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-center">
        {/* Loading State */}
        {status === 'loading' && (
          <p className="text-lg animate-pulse">Loading...</p>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
        )}

        {/* Success State */}
        {status === 'succeeded' && (
          <>
            <h2 className="text-xl font-semibold">Total Job Seekers</h2>
            <p className="mt-2 text-3xl font-bold">{totalPosts}</p>
          </>
        )}
      </div>
      <RiUser3Fill className="absolute bottom-0 left-0 opacity-50 text-6xl" />
    </div>
  );
};

export default JobSeekerCount;

