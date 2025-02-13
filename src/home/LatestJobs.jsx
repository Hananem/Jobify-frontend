import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  // Slice the array to get the last 6 jobs
  const latestJobs = jobs.slice(-6);

  return (
    <div className="mx-auto my-24 px-[4%] md:px-[6%]">
      <motion.h2
        className="text-2xl text-primary font-bold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Latest Jobs
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestJobs.map((job) => (
          <motion.div
            key={job._id}
            className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="flex items-center mb-4">
              <img
                src={job.company.logo.url}
                alt={`${job.company.name} logo`}
                className="w-16 h-16 rounded-xl mr-4"
              />
              <div>
                <Link to={`/jobs/${job._id}`}>
                  <h2 className="text-xl font-bold text-primary">{job.jobTitle}</h2>
                </Link>
                <p className="text-sm text-[#364a44] mb-2">{job.jobType}</p>
              </div>
            </div>
            <p className="text-gray-600">{job.company.name}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <p className="text-green-600 font-medium mt-2">
              ${job.salary?.min} - ${job.salary?.max}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;

