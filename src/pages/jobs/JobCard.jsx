import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ relatedJobs }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mt-6">Related Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(relatedJobs) && relatedJobs.length > 0 ? (
          relatedJobs.map(job => (
            <div key={job._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold">{job.jobTitle}</h3>
              <p className="text-gray-600">{job.company.name}</p>
              <p className="text-gray-500">{job.location}</p>
              <p className="text-gray-700">${job.salary.min} - ${job.salary.max}</p>
              <Link to={`/jobs/${job._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No related jobs found.</p> // Display a message if no related jobs
        )}
      </div>
    </div>
  );
};

export default JobCard;
