// DeleteJobSeekerModal.js
// DeleteJobSeekerModal.js
import React from 'react';

const DeleteJobSeekerModal = ({ isOpen, onClose, onConfirm, jobSeeker }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Delete Job Seeker</h2>
        <p>Are you sure you want to delete the job seeker "{jobSeeker?.user?.username}"?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose} // Close modal on cancel
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Confirm deletion
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteJobSeekerModal;




