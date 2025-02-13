import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../redux/eventsSlice'; // Adjust import according to your directory structure
import { useNavigate } from 'react-router-dom';
import { FaImage } from "react-icons/fa6";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formError, setFormError] = useState('');
  const token = useSelector((state) => state.user?.user?.token); // Assuming token is stored in user state

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!title || !description || !date || !location || !companyName) {
      setFormError('All fields are required');
      return;
    }

    const eventData = {
      title,
      description,
      date,
      location,
      companyName,
      logo,
    };

    dispatch(addEvent({ eventData, token }))
      .unwrap()
      .then(() => {
        navigate('/events'); // Navigate to the events list or wherever you want
      })
      .catch((err) => {
        setFormError(err.message || 'Failed to create event');
      });
  };

  return (
    <div className="p-6 max-w-[700px] mx-auto  mt-16  rounded-lg">
      <h1 className="text-2xl text-primary font-semibold mb-4">Create New Event</h1>
      
      {formError && <div className="text-red-500 mb-4">{formError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <label htmlFor="title">Event Title</label>

        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="input"
          ></textarea>
          <label htmlFor="description">Description</label>

        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
          <label htmlFor="date">Event Date</label>

        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input"
          />
          <label htmlFor="location">Location</label>

        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input"
          />
          <label htmlFor="companyName">Company Name</label>

        </div>

        <div className="form-input w-full sm:flex-1 relative">
          <div className="relative mt-1">
            <input
              type="file"
              id="logo"
              onChange={handleLogoChange}
              className="hidden"
            />
            <div
              className="cursor-pointer w-full h-32 flex items-center justify-center border border-gray-300 rounded-md"
              onClick={() => document.getElementById('logo').click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Company Logo"
                  className="w-full h-32 object-cover border border-gray-300 rounded-md"
                />
              ) : (
                <FaImage className="text-gray-400 text-6xl" />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-4 btn btn-primary"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
