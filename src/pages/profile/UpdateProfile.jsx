import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById, updateUser } from '../../redux/profileSlice'; // Adjust path

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user details from Redux
  const { user, loading, error } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.user.user.token);
  const userId = useSelector((state) => state.user?.user?.user?._id);  // Get user ID from Redux
console.log(userId)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
    },
    skills: '',
    languages: '',
    interests: '',
    experience: '',
    education: '',
    projects: [{ name: '', description: '', link: '' }],
    certifications: ''
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)); // Fetch user data using Redux user ID
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        password: '',
        location: user.location || '',
        socialLinks: {
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
          twitter: user.socialLinks?.twitter || ''
        },
        skills: user.skills ? user.skills.join(', ') : '',
        languages: user.languages ? user.languages.join(', ') : '',
        interests: user.interests ? user.interests.join(', ') : '',
        experience: user.experience || '',
        education: user.education || '',
        projects: user.projects || [{ name: '', description: '', link: '' }],
        certifications: user.certifications || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSocialLinksChange = (e) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleProjectChange = (index, e) => {
    const newProjects = [...formData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', description: '', link: '' }],
    });
  };

  const removeProject = (index) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: newProjects });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      languages: formData.languages.split(',').map(lang => lang.trim()),
      interests: formData.interests.split(',').map(interest => interest.trim()),
    };

    dispatch(updateUser({ id: userId, updatedData, token }))  // Use Redux user ID here
      .unwrap()
      .then(() => {
        navigate(`/profile/${userId}`); // Redirect after successful update
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || 'An error occurred'}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 card mt-14">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">Update Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="input"
          />
          <label>Username</label>
        </div>

        {/* Email Field */}
        <div className="form-input relative mb-4">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="email" className="absolute top-3 left-3 text-gray-500 text-sm">Email</label>
        </div>

        {/* Bio Field */}
        <div className="mb-4 relative">
          <label className="" htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border-primary bg-main dark:bg-dark-main focus:outline-none focus:ring-1 focus:ring-primary"
            rows="4"
          />
        </div>

        {/* Password Field */}
        <div className="form-input relative mb-4">
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="password" className="absolute top-3 left-3 text-gray-500 text-sm">Password</label>
        </div>

        {/* Location Field */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="location" className="absolute top-3 left-3 text-gray-500 text-sm">Location</label>
        </div>

        {/* Social Links */}
        <div className="form-input relative mb-4">
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            value={formData.socialLinks.linkedin}
            onChange={handleSocialLinksChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="linkedin" className="absolute top-3 left-3 text-gray-500 text-sm">LinkedIn</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="url"
            name="github"
            id="github"
            value={formData.socialLinks.github}
            onChange={handleSocialLinksChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="github" className="absolute top-3 left-3 text-gray-500 text-sm">GitHub</label>
        </div>

        <div className="form-input relative mb-4">
          <input
            type="url"
            name="twitter"
            id="twitter"
            value={formData.socialLinks.twitter}
            onChange={handleSocialLinksChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="twitter" className="absolute top-3 left-3 text-gray-500 text-sm">Twitter</label>
        </div>

        {/* Skills Field */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            name="skills"
            id="skills"
            value={formData.skills}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="skills" className="absolute top-3 left-3 text-gray-500 text-sm">Skills</label>
        </div>

        {/* Languages Field */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            name="languages"
            id="languages"
            value={formData.languages}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="languages" className="absolute top-3 left-3 text-gray-500 text-sm">Languages</label>
        </div>

        {/* Interests Field */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            name="interests"
            id="interests"
            value={formData.interests}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="interests" className="absolute top-3 left-3 text-gray-500 text-sm">Interests</label>
        </div>

        {/* Experience Field */}
        <div className="form-input relative mb-4">
          <textarea
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="4"
          />
          <label htmlFor="experience" className="absolute top-3 left-3 text-gray-500 text-sm">Experience</label>
        </div>

        {/* Education Field */}
        <div className="form-input relative mb-4">
          <textarea
            name="education"
            id="education"
            value={formData.education}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="4"
          />
          <label htmlFor="education" className="absolute top-3 left-3 text-gray-500 text-sm">Education</label>
        </div>

        {/* Projects Fields */}
        {formData.projects.map((project, index) => (
          <div key={index} className="project-fields">
            <div className="form-input relative mb-4">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleProjectChange(index, e)}
                className="input"
              />
            </div>
            <div className="form-input relative mb-4">
              <textarea
                name="description"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
                className="input"
              />
            </div>
            <div className="form-input relative mb-4">
              <input
                type="url"
                name="link"
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => handleProjectChange(index, e)}
                className="input"
              />
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => removeProject(index)}
            >
              Remove Project
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn"
          onClick={addProject}
        >
          Add Project
        </button>

        {/* Certifications Field */}
        <div className="form-input relative mb-4">
          <textarea
            name="certifications"
            id="certifications"
            value={formData.certifications}
            onChange={handleChange}
            className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows="4"
          />
          <label htmlFor="certifications" className="absolute top-3 left-3 text-gray-500 text-sm">Certifications</label>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
