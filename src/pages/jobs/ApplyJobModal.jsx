import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ImFilePdf } from "react-icons/im";

const ApplyJobModal = ({ jobId, showModal, closeModal }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const applyForJob = async () => {
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;

      const response = await axios.post(
        `http://localhost:4000/api/jobs/${jobId}/apply`,
        formData,
        {
          headers: { 
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setSavedMessage(response.data.message);
      setTimeout(() => {
        setSavedMessage('');
        closeModal(); 
      }, 3000);
    } catch (err) {
      if (err.response && err.response.data) {
        setSavedMessage(err.response.data.message);
      } else {
        setSavedMessage('Failed to apply for job');
      }
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }
  };

  return (
    <div className={`modal ${showModal ? 'block' : 'hidden'} fixed z-50 inset-0 overflow-y-auto`}>
      <div className="modal-content card p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20">
        <span className="close text-gray-500 cursor-pointer text-3xl float-right" onClick={closeModal}>&times;</span>
        <h2 className="text-2xl mb-4">Apply for Job</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          applyForJob();
        }}>
          <div className="form-input w-full mb-4 relative">
          
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="input"
            >
              {resume ? resume.name : ''}
            </button>
            <label className="block mb-1 flex items-center">
              <ImFilePdf className="mr-2 text-red-500" />
              Resume (PDF):
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden" // Keep the file input hidden
              ref={fileInputRef}
              required
            />
          </div>
          <div className="form-input w-full mb-4 relative">
            <textarea
              name="coverLetter"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="input "
            />
            <label >Cover Letter:</label>

          </div>
          <button type="submit" className="btn btn-primary ">Submit Application</button>
        </form>
        {savedMessage && <p className="mt-4">{savedMessage}</p>}
      </div>
    </div>
  );
};

export default ApplyJobModal;

