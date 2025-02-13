import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FiMoreVertical, FiEdit, FiTrash } from 'react-icons/fi';
import DeleteJobSeekerPost from './DeleteJobSeekerPost';
import UpdateJobSeekerPost from './UpdateJobSeekerPost'; // Import the update component
import Pagination from '../../components/common/Pagination';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HireButton from "./HireButton"

const JobSeekerPosts = ({ posts, status, error, currentPage, totalPages, handlePageChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State for update modal
  const [selectedPostId, setSelectedPostId] = useState(null);
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const user = useSelector((state) => state.user?.user?.user);
  const toggleDropdown = (id) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  const handleDeleteClick = (id) => {
    setSelectedPostId(id);
    setIsDeleteModalOpen(true); // Open delete modal
  };

  const handleEditClick = (id) => {
    setSelectedPostId(id);
    setIsUpdateModalOpen(true); // Open update modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPostId(null);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div>
      {/* Job Seeker Listings */}
      {status === 'loading' &&  <div className="col-span-full flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
            <span className="ml-2 text-gray-600">Loading</span>
          </div>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {posts.map((post) => (
              <motion.div
            
              key={post?.id}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            > <div key={post?._id} className="card p-4 relative flex flex-col justify-between h-full">
              <div className="flex align-center gap-x-2">
                <Link to={`/profile/${post?.user?._id}`}>
                  <img
                    src={post?.user?.profilePhoto?.url || 'default-profile.png'}
                    alt={`${post?.user?.username || 'Unknown User'}'s profile`}
                    className="w-14 h-14 rounded-full"
                  />
                </Link>
                <div>
                  <h1 className="text-xl font-semibold">{post?.user?.username || 'Unknown User'}</h1>
                  <p className="text-primary capitalize">{post?.jobTitle || 'No job title provided'}</p>
                  <span className="text-sm text-muted">{post?.location || 'No location specified'}</span>
                </div>
              </div>
              <div className="flex flex-wrap mt-2">
                {post?.skills?.length > 0 ? (
                  post.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 text-gray-700 text-sm font-medium py-1 px-3 rounded-full mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills listed</span>
                )}
              </div>
              <p className="text-sm mt-3">{post?.description || 'No description provided'}</p>
              <div className="mt-4 mb-6 flex space-x-4">
                <span className="bg-secondaryLightGreen text-secondaryGreen text-sm font-medium py-1 px-3 rounded-full">
                  {post?.experienceLevel || 'No experience level provided'}
                </span>
                <span className="bg-secondaryLightPurple text-primary text-sm font-medium py-1 px-3 rounded-full">
                  {post?.educationLevel || 'No education level provided'}
                </span>
              </div>
              <div className="flex justify-end"> {/* Align the button to the right */}
              {userId && (
         <HireButton postId={post?._id} hiredUserId={post?.user?._id} employerId={userId} />
          )}

  </div>

              {/* Icons with dropdown */}
              {post?.user?._id === userId && (
              <div className="absolute top-2 right-2">
                <FiMoreVertical
                  onClick={() => toggleDropdown(post?._id)}
                  className="cursor-pointer text-gray-600 hover:text-gray-900 text-lg"
                />
                {/* Dropdown Menu */}
                {dropdownVisible === post?._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                    <button
                      onClick={() => handleEditClick(post?._id)} // Open update modal
                      className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiEdit className="inline-block mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post?._id)}
                      className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiTrash className="inline-block mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
           )}

            </div>
           
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteJobSeekerPost postId={selectedPostId} onClose={closeDeleteModal} />
      )}

      {/* Update Job Seeker Post Modal */}
      {isUpdateModalOpen && (
        <UpdateJobSeekerPost postId={selectedPostId} onClose={closeUpdateModal} />
      )}
    </div>
  );
};

export default JobSeekerPosts;

