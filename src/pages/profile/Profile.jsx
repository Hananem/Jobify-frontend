import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; 
import { fetchUserById, deleteUser } from '../../redux/profileSlice';
import ProfilePhoto from './ProfilePhoto';
import { FaGraduationCap, FaBriefcase, FaHeart, FaLanguage, FaCertificate, FaProjectDiagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('certifications');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user = {}, error } = useSelector((state) => state?.profile);
  const token = useSelector((state) => state.user?.user?.token);
  const currentUserId = useSelector((state) => state.user?.user?.user?._id); // Logged-in user's ID
  const profileOwnerId = useSelector((state) => state.profile?.user?._id); // Profile owner's ID
  
  useEffect(() => {
    const loadUserData = async () => {
      if (id) {
        await dispatch(fetchUserById(id));
      }
      setLoading(false);
    };

    loadUserData();
  }, [dispatch, id]);

  // Handle delete user action
  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      dispatch(deleteUser({ id: user._id, token }))
        .unwrap() // Unwrap the action to handle success/failure
        .then(() => {
          // On success, navigate to home
          navigate('/'); // Navigate to the home page after successful deletion
        })
        .catch((error) => {
          console.error('Error deleting profile:', error);
        });
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle confirm delete
  const confirmDelete = () => {
    dispatch(deleteUser({ id: user._id, token }))
      .unwrap()
      .then(() => {
        closeModal();
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error confirming deletion:', error);
      });
  };

  if (loading) return <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full z-10">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
  </div>;

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 mb-10 md:px-6 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {/* Profile Sidebar */}
        <div className="col-span-1 card h-fit dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700 flex flex-col">
          <ProfilePhoto currentPhoto={user.profilePhoto} token={token} profileOwnerId={id} />
          <div className="mb-4 flex-1">
            <p className="text-lg font-semibold">{user.username}</p>
            <p className="text-gray-600">{user.email}</p>
            {user.jobTitle && <p className="text-gray-600">{user.jobTitle}</p>}
            <div className="flex space-x-4 mt-2">
              {user.socialLinks?.linkedin && (
                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondaryGreen transition-colors duration-300">
                  <FaLinkedin size={30} />
                </a>
              )}
              {user.socialLinks?.github && (
                <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondaryGreen transition-colors duration-300">
                  <FaGithub size={30} />
                </a>
              )}
              {user.socialLinks?.twitter && (
                <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondaryGreen transition-colors duration-300">
                  <FaTwitter size={30} />
                </a>
              )}
            </div>
            {user.bio && <p className="text-gray-600 mt-4">{user.bio}</p>}

            {/* Skills Section - Only render if skills array has items */}
            {user.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill, index) => (
                  <span key={index} className="bg-primary text-white px-2 py-1 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            )}
          </div>

          {/* Delete Button */}
          {currentUserId === profileOwnerId && (
            <button 
              onClick={openModal} 
              className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Delete Profile
            </button>
          )}
        </div>

        {/* Profile Details */}
        <div className="col-span-2 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border dark:border-gray-700">
          {/* Education Section */}
          {user.education?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaGraduationCap className="mr-2" /> Education
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.education.map((edu, index) => (
                  <li key={index} className="mb-1">{edu}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience Section */}
          {user.experience?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaBriefcase className="mr-2" /> Experience
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {user.experience.map((exp, index) => (
                  <li key={index} className="mb-1">{exp}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Interests Section */}
          {user.interests?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaHeart className="mr-2" /> Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span key={index} className="bg-secondary text-white px-2 py-1 rounded-full text-sm">{interest}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {user.languages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaLanguage className="mr-2" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language, index) => (
                  <span key={index} className="bg-primary text-white px-2 py-1 rounded-full text-sm">{language}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tabs for Certifications and Projects */}
          <div className="flex border-b border-gray-300 dark:border-gray-700 mb-4">
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'certifications' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('certifications')}
            >
              Certifications
            </button>
            <button
              className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === 'projects' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
          </div>

          {/* Certifications */}
          {activeTab === 'certifications' && user.certifications?.length > 0 && (
            <div className="space-y-2">
              {user.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaCertificate className="text-primary" />
                  <p className="text-gray-700 dark:text-gray-300">{cert}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && user.projects?.length > 0 && (
            <div className="space-y-2">
              {user.projects.map((project, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaProjectDiagram className="text-primary" />
                  <p className="text-gray-700 dark:text-gray-300">{project}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="card p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="my-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;




