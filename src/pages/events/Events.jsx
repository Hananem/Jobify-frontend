import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents, filterEvents } from '../../redux/eventsSlice';
import EventFilters from './EventFilters';
import EventList from './EventList';
import Pagination from '../../components/common/Pagination';

const Events = () => {
  const dispatch = useDispatch();
  const { events, status, error, currentPage, totalPages } = useSelector((state) => state.events);

  const [filters, setFilters] = useState({
    title: '',
    location: '',
    company: '',
    date: '',
  });

  const [limit] = useState(6); // Items per page
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (
      filters.title !== '' ||
      filters.location !== '' ||
      filters.company !== '' ||
      filters.date !== ''
    ) {
      setIsFiltering(true);
      dispatch(filterEvents({ ...filters, page: currentPage, limit }));
    } else {
      setIsFiltering(false);
      dispatch(fetchAllEvents({ page: currentPage, limit }));
    }
  }, [dispatch, currentPage, filters, limit]);

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      title: '',
      location: '',
      company: '',
      date: '',
    });
    dispatch(fetchAllEvents({ page: 1, limit }));
  };

  const handlePageChange = (page) => {
    if (isFiltering) {
      dispatch(filterEvents({ ...filters, page, limit }));
    } else {
      dispatch(fetchAllEvents({ page, limit }));
    }
  };

  return (
    <div className="container mx-auto md:px-[6%] py-[0.35rem] mt-8">
      <div className="mt-8">
      <EventFilters
        filters={filters}
        handleInputChange={handleInputChange}
        handleResetFilters={handleResetFilters}
      />
      </div>
     
      
      {status === 'loading' &&  <div className="col-span-full flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Loading</span>
          </div>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && <EventList events={events} />}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Events;


