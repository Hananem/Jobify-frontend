import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobById } from '../../redux/jobSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UpdateJob from './UpdateJob';
import DeleteJob from './DeleteJob';
import JobCard from './JobCard';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { FaMapMarkerAlt, FaDollarSign, FaBriefcase } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import { PiGraduationCapLight } from 'react-icons/pi';
import { TbClockHour7 } from 'react-icons/tb';
import ApplyJobModal from './ApplyJobModal'; // Import ApplyJobModal component
import SaveJob from './SaveJob'; 
import Moment from 'react-moment';
import { current } from '@reduxjs/toolkit';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedJob, relatedJobs, status, error } = useSelector((state) => state.jobs);
  console.log(selectedJob?.postedBy?._id)
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); // Show/hide ApplyJobModal
  const currentUserId = useSelector((state) => state.user?.user?.user?._id);
  console.log(currentUserId)
  const userId = useSelector((state) => state.user?.user?.user?._id);
  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

   // Function to handle the "Apply Now" button click
   const handleApplyNowClick = (jobId) => {
    if (!userId) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setSelectedJobId(jobId); // Set the selected job ID
      setShowModal(true); // Open the modal
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the ApplyJobModal
  };

  if (status === 'loading') return <div className="text-center py-4">Loading...</div>;
  if (status === 'failed') return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!selectedJob) return <div className="text-center py-4">No job found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-14">
      {/* Job Details Section */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 p-6 rounded-lg">
        <div className="relative flex flex-col md:flex-row items-start md:items-center mb-6">
        <div className="flex space-x-4">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 md:mr-4">{selectedJob.jobTitle}</h1>
      
        <div className="flex space-x-4">
        <button
                onClick={() => handleApplyNowClick(selectedJob._id)}
                className="btn btn-primary"
              >
                Apply for Job
              </button>
          <SaveJob jobId={id} /> {/* Save job button */}
        </div>

        {/* Apply Job Modal */}
        {showModal && (
          <ApplyJobModal
            jobId={id}
            showModal={showModal}
            closeModal={closeModal}
          />
        )}
    </div>
         {/* Conditional rendering of the dropdown */}
          {currentUserId === selectedJob?.postedBy?._id && (
            <div className="card absolute top-2 right-2">
              <div className="relative">
                <FaEllipsisV
                  className="text-lg text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={toggleDropdown}
                  style={{ zIndex: 10 }}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 card border border-gray-200 rounded shadow-lg z-20">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={toggleUpdateModal}
                      >
                        <FaEdit className="mr-2" /> Edit
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={toggleDeleteModal}
                      >
                        <FaTrash className="mr-2" /> Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="mb-4">
        <div className="flex items-start gap-x-4"> 
        {selectedJob.company.logo && (
            <img
              src={selectedJob?.company?.logo?.url}
              alt={`${selectedJob.company.name} logo`}
              className="w-20 h-20 rounded-lg object-cover mb-4"
            />
          )}
           <div className="flex flex-col">
        <p className="mb-2 font-semibold text-primary">{selectedJob.company.name}</p>
        {/* Display relative time like "a day ago", "a month ago", etc. */}
        <p className="text-sm ">
          Posted: <Moment fromNow>{selectedJob.createdAt}</Moment>
        </p>
      </div>

        </div>
          <p className="mb-2">{selectedJob.company.description}</p>
          <p className="mb-2 flex items-center">
            <FaBriefcase className="mr-2" /> {selectedJob.experienceLevel}
          </p>
          <p className="mb-2 flex items-center">
            <IoMdPaperPlane className="mr-2" /> {selectedJob.jobType}
          </p>
          <p className="mb-2 flex items-center">
            <TbClockHour7 className="mr-2" /> {selectedJob.employmentType}
          </p>
          <p className="mb-2 flex items-center">
            <PiGraduationCapLight className="mr-2" /> {selectedJob.educationLevel}
          </p>
          <p className="mb-2 flex items-center">
            <MdOutlineMail className="mr-2" /> {selectedJob.company.contactEmail}
          </p>
          <p className="mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" /> {selectedJob.location}
          </p>
          <p className="mb-2 flex items-center">
            <FaDollarSign className="mr-2" /> ${selectedJob.salary.min} - ${selectedJob.salary.max}
          </p>
        </div>

        <div className="mb-6">
          <p className="font-bold">Requirements:</p>
          <ul className="list-disc ml-5">
            {selectedJob.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
          
          <p className="font-bold mt-4">Responsibilities:</p>
          <ul className="list-disc ml-5">
            {selectedJob.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center space-x-3">
            <p className="font-bold">Posted By:</p>
            <div className="flex items-center space-x-2">
              {selectedJob.postedBy.profilePhoto?.url && (
                <img
                  src={selectedJob.postedBy.profilePhoto.url}
                  alt={selectedJob.postedBy.username}
                  className="w-9 h-9 rounded-full object-cover"
                />
              )}
              <Link
                to={`/profile/${selectedJob.postedBy._id}`}  // Link to profile
                className="text-sm hover:underline"
              >
                {selectedJob.postedBy.username}
              </Link>
            </div>
          </div>
     

        {/* Update Job Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <UpdateJob isOpen={showUpdateModal} onClose={toggleUpdateModal} jobId={id} />
            </div>
          </div>
        )}

        {/* Delete Job Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <DeleteJob isOpen={showDeleteModal} onClose={toggleDeleteModal} jobId={id} />
            </div>
          </div>
        )}
      </div>

      {/* Related Jobs Section */}
      <div className="col-span-1 md:col-span-1 lg:col-span-1 p-6 rounded-lg h-fit shadow-md">
        <h2 className="text-xl font-bold mt-6">Related Jobs</h2>
        <div className="grid grid-cols-1 gap-4">
          {Array.isArray(relatedJobs) && relatedJobs.length > 0 ? (
            relatedJobs.map(job => (
              <JobCard key={job._id} job={job} />
            ))
          ) : (
            <p>No related jobs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;






