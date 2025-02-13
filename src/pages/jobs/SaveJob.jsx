import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveJob } from '../../redux/userSlice'; // Import saveJob action
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"; // Import Bookmark icons

const SaveJob = ({ jobId }) => {
  const dispatch = useDispatch();

  // Access saved jobs from the Redux state
  const savedJobs = useSelector((state) => state.user?.user?.user?.savedJobs);

  // Check if the job is already saved
  const isJobSaved = savedJobs?.includes(jobId);

  const handleSaveJob = () => {
    dispatch(saveJob(jobId)); // Dispatch the save job action
  };

  return (
    <button onClick={handleSaveJob} className="flex items-center">
      {isJobSaved ? (
        <IoBookmark className="text-2xl text-green-600" /> // Show filled bookmark if saved
      ) : (
        <IoBookmarkOutline className="text-2xl text-gray-600" /> // Show outline bookmark if not saved
      )}
    </button>
  );
};

export default SaveJob;

