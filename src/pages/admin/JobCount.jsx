import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobCount } from '../../redux/jobSlice'; 
import { MdWork } from "react-icons/md";

const JobCount = () => {
  const dispatch = useDispatch();
  const jobCount = useSelector((state) => state.jobs.jobCount);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);

  useEffect(() => {
    dispatch(fetchJobCount());
  }, [dispatch]);

  return (
    <div className="bg-[#566957] text-white relative shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
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
            <h2 className="text-xl font-semibold">Total Jobs </h2>
            <p className="mt-2 text-3xl font-bold">{jobCount}</p>
          </>
        )}
        <MdWork className='absolute bottom-0 left-0 opacity-50 text-6xl' />
      </div>
    </div>
  );
};

export default JobCount;


