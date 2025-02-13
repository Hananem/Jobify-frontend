import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { markInterested } from '../../redux/userSlice';
import Moment from 'react-moment';
const EventList = ({ events }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const interestedEvents = useSelector((state) => state.user?.user?.user?.interestedEvents);
  const userId = useSelector((state) => state.user?.user?.user?._id);

  const handleMarkAsInterested = async (eventId) => {
    try {
      await dispatch(markInterested(eventId)).unwrap();
    } catch (error) {
      console.error('Error marking event as interested:', error);
      setError(error.message);
    }
  };

  const isInterested = (eventId) => interestedEvents?.includes(eventId);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      {events.map((event) => (
        <div key={event._id} className="card p-4 rounded-lg shadow-md overflow-hidden">
          <div className="flex items-start gap-x-2">
          <img
            src={event.company.logo?.url}
            alt={event.company.name}
            className="w-14 h-14 rounded-md  object-cover"
          />
            <p className="mt-4 font-semibold">{event.company.name}</p>

          </div>

         
          <div className="p-4">
            <h2 className="text-xl font-semibold">{event.title}</h2>
               {/* Display event date */}
               <p className="mt-2 text-gray-400">
              <Moment format="MMM D, YYYY">{event.date}</Moment>
            </p>
            <p>{event.location}</p>
          </div>
          {userId && (
            <button
              onClick={() => handleMarkAsInterested(event._id)}
              className={`py-2 px-4 rounded ml-2 ${isInterested(event._id) ? 'btn btn-primary-light' : 'btn btn-primary'} mb-2`}
            >
              {isInterested(event._id) ? 'Not Interested' : 'Interested'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;

