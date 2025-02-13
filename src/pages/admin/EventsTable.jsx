import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents } from '../../redux/eventsSlice';
import UpdateEventModal from './UpdateEventModal';
import DeleteEventModal from './DeleteEventModal';
import Pagination from '../../components/common/Pagination';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const EventsTable = () => {
  const dispatch = useDispatch();
  const { events, status, error, totalPages } = useSelector((state) => state.events);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchAllEvents({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage]);

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 mt-4">
        <Link
              to="/create-event"
              className="flex items-center btn btn-primary w-fit"
            >
              <FiPlus className="mr-2" />
              Create Event
            </Link>
       <table className="min-w-full bg-white dark:bg-dark-card mt-14 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Company Logo</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Title</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Description</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Date</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Location</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Company</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
                <td className="px-4 py-4 border-b dark:border-hover-color">
                  {event.company?.logo?.url && (
                    <img
                      src={event.company.logo.url}
                      alt={event.company.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                </td>
                <td className="px-4 py-4 border-b dark:border-hover-color">{event.title}</td>
                <td className="px-4 py-4 border-b dark:border-hover-color">{event.description}</td>
                <td className="px-4 py-4 border-b dark:border-hover-color">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 border-b dark:border-hover-color">{event.location}</td>
                <td className="px-4 py-4 border-b dark:border-hover-color">{event.company.name}</td>
                <td className="px-4 py-2 border-b dark:border-hover-color">
                <div className="flex items-center gap-x-2">
                <button
                    onClick={() => handleUpdate(event)}
                    className="btn btn-primary-light"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(event)}
                    className="btn btn-red"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
                 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center border-b dark:border-hover-color">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        closeModal={() => setIsUpdateModalOpen(false)}
        event={selectedEvent}
      />
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventsTable;




