import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../../redux/eventsSlice';

const DeleteEventModal = ({ isOpen, closeModal, event }) => {
  const dispatch = useDispatch();
  
  // Access token from the Redux state
  const token = useSelector((state) => state.user?.user?.token);

  const handleDelete = () => {
    if (token) {
      dispatch(deleteEvent({ id: event._id, token }));
      closeModal();
    } else {
      console.error("Token not found");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="card p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this event?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-primary-light"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
