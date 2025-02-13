import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobSeekerPost } from '../../redux/jobSeekerPostsSlice';

const CreateJobSeekerPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        createJobSeekerPost({
          jobTitle,
          location,
          description,
          skills: skills.split(',').map((skill) => skill.trim()),
          experienceLevel,
          educationLevel,
        })
      ).unwrap();

      // Show success modal and reset form
      setModalMessage('Job seeker post created successfully!');
      setIsError(false);
      setIsModalOpen(true);
      setJobTitle('');
      setLocation('');
      setDescription('');
      setSkills('');
      setExperienceLevel('');
      setEducationLevel('');
    } catch (error) {
      // Show error modal
      setModalMessage('Failed to create job seeker post. Please try again.');
      setIsError(true);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8  mt-14">
      <h1 className="text-2xl font-bold mb-6">Create Job Seeker Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-input relative mb-4">
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="input"
          />
          <label htmlFor="jobTitle">Job Title</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="input"
          />
          <label htmlFor="location">Location</label>
        </div>

        <div className="form-input relative mb-4">
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input min-h-32"
            rows="4"
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="text"
            id="skills"
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="input"
          />
          <label htmlFor="skills">Skills (comma-separated)</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="text"
            id="experienceLevel"
            name="experienceLevel"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
            className="input"
          />
          <label htmlFor="experienceLevel">Experience Level</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="text"
            id="educationLevel"
            name="educationLevel"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            required
            className="input"
          />
          <label htmlFor="educationLevel">Education Level</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className={`text-lg font-bold ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {isError ? 'Error' : 'Success'}
            </h2>
            <p className="mt-2">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="btn btn-primary mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJobSeekerPost;
