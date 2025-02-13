import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countEvents } from '../../redux/eventsSlice'; 
import { BiSolidCalendarEvent } from "react-icons/bi";

const EventCount = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.events.totalCount);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(countEvents(token));
  }, [dispatch, token]);

  return (
    <div className="bg-[#85546c] text-white relative shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-center">
        {/* Loading State */}
        {status === 'loading' && (
          <p className="text-lg animate-pulse">Loading...</p>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>
        )}

        {/* Success State */}
        {status === 'succeeded' && (
          <>
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="mt-2 text-3xl font-bold">{totalCount}</p>
          </>
        )}
        <BiSolidCalendarEvent className='absolute bottom-0 left-0 opacity-50 text-6xl' />
      </div>
    </div>
  );
};

export default EventCount;

