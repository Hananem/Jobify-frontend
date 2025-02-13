import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleDropdown, toggleNotifications, openDropdown, closeSidebar, closeDropdown } from '../../redux/uiSlice';
import { fetchNotifications, markNotificationsAsRead } from '../../redux/notificationsSlice';
import Notifications from './Notifications';
import Dropdown from './Dropdown';
import useDarkMode from '../../helpers/useDarkMode';
import links from './links';
import { BiBell, BiChevronDown, BiMenu } from 'react-icons/bi';
import { FiDelete, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { fetchUserById } from '../../redux/profileSlice';
import LOGO from"../../images/logo.png"

const Navbar = () => {
  const dispatch = useDispatch();
  const [colorTheme, setColorTheme] = useDarkMode();
  const [mode, toggleMode] = useDarkMode('JobIt-Next-theme-mode');
  const { notifications, unreadCount, status } = useSelector((state) => state.notifications);
  const { user } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.user?.user?.user?._id);
  const owner= useSelector((state) => state.user?.user?.user);
  const profilePhoto = useSelector((state) => state.user?.user?.user?.profilePhoto);
  const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen);
  const isNotificationsOpen = useSelector((state) => state.ui.isNotificationsOpen);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isDropdownOpen = useSelector((state) => state.ui.isDropdownOpen);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  const handleDropdown = () => {
    dispatch(toggleDropdown());
  };

  const handleClose = (e) => {
    if (!e.target.classList.contains('dropdown-btn')) {
      dispatch(closeDropdown());
    }
  };

  const handleNotifications = () => {
    dispatch(toggleNotifications());
  };

  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains('mobile-modal')) dispatch(closeSidebar());
  };

  return (
    <nav className="navbar mx-auto fixed w-full z-10 top-0 left-0 px-[2%] md:px-[6%] flex-center-between py-[0.35rem] bg-white dark:bg-dark-card border-b dark:border-slate-800" onClick={handleClose}>
      {/* Logo */}
      <div className="flex items-center gap-x-1 text-xl font-semibold">
      <a href="/">
      <motion.img
              src={LOGO}
              alt="logo"
             
              whileTap={{ scale: 0.5 }}
            />
      </a>
    
        <a href="/">Jobify</a>
      </div>

      {/* Links */}
      <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
        {links.map(({ id, linkText, url }) => (
          <Link to={url} key={id}>
            {linkText}
          </Link>
        ))}
      </ul>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition-a ${isSidebarOpen && 'open'}`}
        onClick={handleCloseSidebar}
      >
        <ul
          className={`mobile-dialog absolute flex flex-col space-y-4 p-3 bg-white dark:bg-dark-card h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${isSidebarOpen && 'open'}`}
        >
          <div className="flex-center-between">
            <p className="uppercase">menu</p>
            <div className="icon-box md:hidden" onClick={() => dispatch(closeSidebar())}>
              <FiDelete />
            </div>
          </div>
          {links.map(({ id, linkText, url }) => (
            <Link key={id} to={url} onClick={() => dispatch(closeSidebar())}>
              {linkText}
            </Link>
          ))}
        </ul>
      </div>

      {/* Menu and Sidebar */}
      <div className="flex items-center space-x-4">
        {/* Search Form */}
        <SearchForm showSearchBar={showSearchBar} setShowSearchBar={setShowSearchBar} />

        {/* Notifications */}
        {userId && (
          <div
            className={`icon-box !opacity-100 relative notification-btn ${showSearchBar && '!hidden'}`}
            onClick={handleNotifications}
          >
            <motion.div className="relative" whileTap={{ scale: 0.5 }}>
              <BiBell className="notification-btn text-muted" />
              {unreadCount > 0 && (
                <div className="absolute w-4 h-4 bg-primary top-[-5px] right-[-6px] rounded-full flex-center-center text-[12px] text-white notification-btn">
                  {unreadCount}
                </div>
              )}
            </motion.div>
            {isNotificationsOpen && <Notifications notifications={notifications} status={status} />}
          </div>
        )}

        {/* Dropdown */}
        {userId ? (
          <div className="dropdown-btn flex-align-center space-x-1 md:pl-4 flex-shrink-0 relative" onClick={handleDropdown}>
            <motion.img
              src={owner?.profilePhoto?.url }
              alt="Profile"
              className="w-8 h-8 rounded-full sm:cursor-pointer dropdown-btn"
              whileTap={{ scale: 0.5 }}
            />
            <BiChevronDown className="dropdown-btn cursor-pointer rounded-full absolute bottom-[-4px] right-[-4px] text-lg" />
            {isDropdownOpen && <Dropdown />}
          </div>
        ) : (
          <Link to="/login" className="">Login</Link>
        )}

        {/* Dark Mode Toggle */}
        <motion.div
          className="icon-box bg-slate-100 dark:bg-[#2b2b35]"
          onClick={toggleMode}
          whileTap={{ scale: 0.5 }}
        >
          {mode === 'dark' ? <FiSun /> : <FiMoon />}
        </motion.div>

        {/* Mobile Menu Toggle Button */}
        <motion.div
          className="icon-box md:hidden"
          onClick={() => dispatch(toggleSidebar())}
          whileTap={{ scale: 0.5 }}
        >
          <BiMenu />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;


