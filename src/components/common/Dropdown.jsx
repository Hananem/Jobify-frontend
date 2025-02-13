import React from 'react';
import { BiBriefcase, BiLogOut, BiUser, BiUserCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { closeDropdown } from '../../redux/uiSlice';
import { logout } from '../../redux/userSlice'; 
import { Link } from 'react-router-dom'; 
import { CiSettings } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const Dropdown = () => {
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.ui.isDropdownOpen); 
  const id = useSelector((state) => state.user?.user?.user?._id); 
  const user = useSelector((state) => state.user.user.user);
  
  const handleCloseDropdown = () => {
    dispatch(closeDropdown()); 
  };

  const handleLogout = () => {
    dispatch(logout()); 
    handleCloseDropdown(); 
  };

  return (
    <>
      {isDropdownOpen && (
        <motion.div
          className="dropdown absolute right-0 top-full mt-1 p-2 !rounded-xl w-52 card card-shadow dark:shadow-none"
          initial={{ scale: 0.6, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          onClick={handleCloseDropdown} 
        >
          {id && (
            <Link 
              to={`/profile/${id}`} 
              className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
              onClick={handleCloseDropdown} 
            >
              <BiUserCircle className="text-muted" />
              <span className="text-muted">My Profile</span>
            </Link>
          )}

          <Link 
            to="/history" 
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleCloseDropdown} 
          >
            <MdHistory className="text-muted" />
            <span className="text-muted">History</span>
          </Link>

          <Link 
            to="/profile/update" 
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleCloseDropdown} 
          >
            <CiSettings className="text-muted" />
            <span className="text-muted">Update Profile</span>
          </Link>

          <Link 
            to="/create-job" 
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleCloseDropdown} 
          >
            <BiBriefcase className="text-muted" />
            <span className="text-muted">Create Job</span>
          </Link>

          <Link 
            to="/create-jobseeker" 
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleCloseDropdown} 
          >
            <BiUser className="text-muted" />
            <span className="text-muted">Create JobSeeker</span>
          </Link>
          
          {user?.isAdmin && (
            <Link 
              to="/dashboard" 
              className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
              onClick={handleCloseDropdown} 
            >
              <LuLayoutDashboard className="text-muted" />
              <span className="text-muted">Dashboard</span>
            </Link>
          )}

          <Link 
            to="#"
            className="flex-align-center space-x-3 p-2 sm:cursor-pointer hover:bg-slate-100 dark:hover:bg-hover-color rounded-lg"
            onClick={handleLogout} 
          >
            <BiLogOut className="text-muted" />
            <span className="text-muted">Sign out</span>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default Dropdown;
