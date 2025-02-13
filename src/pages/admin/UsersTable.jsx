import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../../redux/profileSlice';
import DeleteUserModal from './DeleteUserModal';
import Pagination from '../../components/common/Pagination';
import { FaTrash } from 'react-icons/fa';
const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error, totalPages } = useSelector((state) => state.profile);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of users per page

  useEffect(() => {
    dispatch(fetchAllUsers({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser({ id: selectedUser._id }));
    }
    closeModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-14">
    <table className="min-w-full bg-white dark:bg-dark-card  rounded-lg">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Profile Photo</th>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Name</th>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Job Title</th>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Email</th>
          <th className="px-4 py-2 text-left border-b dark:border-hover-color">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 dark:hover:bg-hover-color">
              <td className="px-4 py-2 border-b dark:border-hover-color">
                {user.profilePhoto?.url && (
                  <img
                    src={user.profilePhoto.url}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.username}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.jobTitle || 'Not provided'}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">{user.email}</td>
              <td className="px-4 py-2 border-b dark:border-hover-color">
                <button
                  onClick={() => openModal(user)}
                  className="btn btn-red">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="text-center border-b dark:border-hover-color">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>

    <Pagination 
      currentPage={currentPage} 
      totalPages={totalPages} 
      handlePageChange={(page) => setCurrentPage(page)} 
    />

    <DeleteUserModal
      isOpen={isModalOpen}
      closeModal={closeModal}
      handleDelete={handleDelete}
      user={selectedUser}
    />
  </div>
  );
};

export default UserTable;


