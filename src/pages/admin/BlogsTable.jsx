import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlogById } from '../../redux/blogSlice'; // Import the actions
import DeleteBlogModal from './DeleteBlogModal';
import UpdateBlogModal from './UpdateBlogModal';
import Pagination from '../../components/common/Pagination'; // Import the Pagination component
import { FaEdit, FaTrash } from 'react-icons/fa';
import Moment from 'react-moment';
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const BlogsTable = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.user?.token);
  const { blogs, status, error, totalPages } = useSelector((state) => state.blogs);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const openUpdateModal = (blog) => {
    setSelectedBlog(blog);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDelete = () => {
    if (selectedBlog && token) {
      dispatch(deleteBlogById({ id: selectedBlog._id, token }));
    }
    closeDeleteModal();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/create-blog"
        className="flex items-center btn btn-primary w-fit"
      >
        <FiPlus className="mr-2" />
        Create Blog
      </Link>
      <table className="min-w-full bg-white dark:bg-dark-card  mt-14 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Image</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Title</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Date</th>
            <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <img src={blog.image.url} alt={blog.title} className="w-16 h-16 object-cover rounded-lg" />
              </td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{blog.title}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color"> <Moment format="MMMM Do YYYY">{blog.createdAt}</Moment></td>
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <button onClick={() => openUpdateModal(blog)} className="btn btn-primary-light mr-2">
                <FaEdit size={20} />
                </button>
                <button onClick={() => openDeleteModal(blog)} className="btn btn-red">
                <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        blog={selectedBlog}
      />

      <UpdateBlogModal
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        blog={selectedBlog}
      />
    </div>
  );
};

export default BlogsTable;

