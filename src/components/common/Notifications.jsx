import { useDispatch } from 'react-redux';
import { markNotificationsAsRead } from '../../redux/notificationsSlice'; // Import the markAsRead action
import { motion } from "framer-motion";

const Notifications = ({ notifications, status }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  const handleMarkAllAsRead = () => {
    dispatch(markNotificationsAsRead());
  };
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading notifications</p>;

  return (
    <motion.div
      className="dropdown absolute -left-24 z-20 top-full mt-3 p-2 !rounded-xl w-[320px] card card-shadow dark:shadow-none"
      initial={{ scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
    >
      <button
        className="btn btn-primary-light "
        onClick={handleMarkAllAsRead}
      >
        Mark all as read
      </button>
      {notifications.map((notification) => (
        <div
          className={`flex space-x-3 p-2 border-b dark:border-hover-color mt-4 sm:cursor-pointer ${
            notification.read ? 'card' : 'bg-primary-light'
          }`}
          key={notification._id}
        >
          <div>
            <img
              src={notification.fromUser.profilePhoto?.url}
              alt="profile"
              className="w-8 h-8 rounded-full mr-8"
            />
          </div>
          <div>
            <h1 className="font-bold">{notification.fromUser.username}</h1>
            <p className="text-sm">
              {notification.message}{' '}
              {notification.job && <span className="text-primary">Job: {notification.job.jobTitle}</span>}
              {notification.jobHired && <span className="text-primary">Job Seeker: {notification.jobHired.jobTitle}</span>}
            </p>
            <span className="text-sm text-slate-500">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default Notifications;


