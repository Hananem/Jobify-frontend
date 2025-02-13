import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchJobById, deleteJob } from '../../redux/jobSlice';

const DeleteJob = ({ isOpen, onClose, jobId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedJob, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (isOpen && jobId) {
      dispatch(fetchJobById(jobId));
    }
  }, [dispatch, isOpen, jobId]);

  const handleDelete = async () => {
    await dispatch(deleteJob(jobId));
    onClose(); 
    navigate('/jobs'); 
  };

  if (!isOpen) return null; 

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="card rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Delete Job</h1>
        {selectedJob && (
          <div>
            <p>Are you sure you want to delete the job titled: <strong>{selectedJob.jobTitle}</strong>?</p>
            <p>Location: {selectedJob.location}</p>
            <p>Experience Level: {selectedJob.experienceLevel}</p>
            <p>Employment Type: {selectedJob.employmentType}</p>
            {/* Add more job details if needed */}

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete Job
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteJob;


