import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, deleteJob } from '../../redux/jobSlice';
import { FaTrash } from 'react-icons/fa';
import DeleteJobModal from './DeleteJobModal'; // Import the DeleteJobModal component
import Pagination from '../../components/common/Pagination';// Import the Pagination component

const JobsTable = () => {
  const dispatch = useDispatch();
  const { jobs, status, error, totalPages } = useSelector((state) => state.jobs); // Ensure totalPages is in the state

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchJobs({ page: currentPage, limit: pageSize })); // Fetch jobs with pagination
  }, [dispatch, currentPage]);

  const handleDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="p-4 mt-14">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Jobs</h2>
      </div>

      <table className="w-full mt-8 table-auto bg-white dark:bg-dark-card ">
        <thead>
          <tr>
             <th className="px-4 py-2 text-left border-b dark:border-hover-color">Company Logo</th>
             <th className="px-4 py-2 text-left border-b dark:border-hover-color">Company Name</th>
             <th className="px-4 py-2 text-left border-b dark:border-hover-color">Job Title</th>
             <th className="px-4 py-2 text-left border-b dark:border-hover-color">Job Type</th>
             <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
              <td className="px-4 py-2 border-b dark:border-hover-color">
                {job.company?.logo?.url && (
                  <img
                    src={job.company.logo.url}
                    alt={job.company.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
              </td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{job.company.name}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{job.jobTitle}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{job.jobType}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <button
                  onClick={() => handleDelete(job)}
                  className="btn btn-red"
                >
                  <FaTrash  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {/* Modal component */}
      <DeleteJobModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobsTable;
