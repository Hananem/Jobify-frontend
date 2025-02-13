import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllJobSeekers,
  deleteJobSeekerPost,
} from '../../redux/jobSeekerPostsSlice';
import { FaTrash } from 'react-icons/fa';
import Pagination from '../../components/common/Pagination';
const JobSeekersTable = () => {
  const dispatch = useDispatch();
  const { posts, status, error, totalPages } = useSelector((state) => state.jobSeekerPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllJobSeekers({ page: currentPage, limit: 10 }));
    }
  }, [dispatch, status, currentPage]);

  const handleDelete = (postId) => {
    dispatch(deleteJobSeekerPost(postId));
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Seekers</h1>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && error && (
        <p className="text-red-500">{error.message || 'An error occurred'}</p>
      )}
  
      <table className="min-w-full bg-white dark:bg-dark-card">
        <thead>
          <tr >
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Username</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Job Title</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Skills</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Location</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr className="hover:bg-gray-100 dark:hover:bg-hover-color">
               <td className="px-4 py-4 border-b dark:border-hover-color">{post.user?.username}</td>
               <td className="px-4 py-4 border-b dark:border-hover-color">{post.jobTitle}</td>
               <td className="px-4 py-4 border-b dark:border-hover-color">{post.skills.join(', ')}</td>
               <td className="px-4 py-4 border-b dark:border-hover-color">{post.location}</td>
               <td className="px-4 py-4 border-b dark:border-hover-color">
                <button 
                  className="btn btn-red"
                  onClick={() => handleDelete(post._id)}
                >
                 <FaTrash/>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <div className="mt-4">
        
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      </div>
    </div>
  );
  
};

export default JobSeekersTable;




