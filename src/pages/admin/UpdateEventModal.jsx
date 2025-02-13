import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, updateEventLogo } from '../../redux/eventsSlice';

const UpdateEventModal = ({ isOpen, closeModal, event }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.user?.token); // Fetch token from Redux

  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    location: event?.location || '',
    companyName: event?.companyName || '',
  });
  
  const [logo, setLogo] = useState(null);

  // Use effect to update formData when event prop changes
  useEffect(() => {
    setFormData({
      title: event?.title || '',
      description: event?.description || '',
      date: event?.date || '',
      location: event?.location || '',
      companyName: event?.companyName || '',
    });
  }, [event]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(updateEvent({ id: event._id, eventData: formData, token }));
      closeModal(); 
    }
  };

  const handleLogoUpdate = (e) => {
    e.preventDefault();
    if (logo && token) {
      dispatch(updateEventLogo({ id: event._id, logo, token }));
      closeModal(); 
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="card max-w-2xl w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="form-input relative mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
            />
            <label >Title</label>

          </div>
          
           <div className="form-input relative mb-4">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
            />
            <label >Description</label>

          </div>

           <div className="form-input relative mb-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
            />
            <label >Date</label>

          </div>

           <div className="form-input relative mb-4">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />
            <label >Location</label>

          </div>

           <div className="form-input relative mb-4">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="input"
            />
            <label >Company Name</label>

          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Event
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Update Event Logo</h3>
          <form onSubmit={handleLogoUpdate}>
            <input
              type="file"
              onChange={handleFileChange}
              className="input"
            />
            <button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm"
            >
              Upload Logo
            </button>
          </form>
        </div>

        <button
          onClick={closeModal}
          className="btn btn-primary-light"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateEventModal;

