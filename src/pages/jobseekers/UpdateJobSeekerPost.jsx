import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateJobSeekerPost } from '../../redux/jobSeekerPostsSlice';

const UpdateJobSeekerPost = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.jobSeekerPosts.posts.find((post) => post._id === postId)
  );

  // State variables for the form fields
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [educationLevel, setEducationLevel] = useState('');

  // Update form fields when post data changes
  useEffect(() => {
    if (post) {
      setJobTitle(post.jobTitle);
      setLocation(post.location);
      setDescription(post.description);
      setSkills(post.skills.join(', '));
      setExperienceLevel(post.experienceLevel);
      setEducationLevel(post.educationLevel);
    }
  }, [post]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateJobSeekerPost({
      postId,
      updateData: {
        jobTitle,
        location,
        description,
        skills: skills.split(',').map(skill => skill.trim()),
        experienceLevel,
        educationLevel,
      },
    }));
    onClose(); // Close modal after update
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>X</button>
        <h2 className="text-xl font-semibold mb-4">Update Job Seeker Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            required
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
            className="border rounded-md p-2 w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skills (comma-separated)"
            required
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            placeholder="Experience Level"
            required
            className="border rounded-md p-2 w-full"
          />
          <input
            type="text"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            placeholder="Education Level"
            required
            className="border rounded-md p-2 w-full"
          />
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">Update Post</button>
            <button type="button" onClick={onClose} className="btn btn-primary-light">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobSeekerPost;



