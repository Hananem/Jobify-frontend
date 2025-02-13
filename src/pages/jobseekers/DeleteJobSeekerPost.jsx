import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteJobSeekerPost } from '../../redux/jobSeekerPostsSlice';

const DeleteJobSeekerPost = ({ postId, onClose }) => {
  const dispatch = useDispatch();

  // Handle delete action
  const handleDelete = () => {
    dispatch(deleteJobSeekerPost(postId));
    onClose(); // Close modal after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobSeekerPost;

