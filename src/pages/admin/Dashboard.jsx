import { FiDelete } from "react-icons/fi";
import { MdMenuOpen } from "react-icons/md";
import { openFilterMenu, closeFilterMenu } from "../../redux/uiSlice";
import { useDispatch, useSelector } from 'react-redux';
import BlogsTable from "./BlogsTable";
import EventsTable from "./EventsTable";
import JobsTable from "./JobsTable";
import JobSeekersTable from "./JobSeekersTable";
import UsersTable from "./UsersTable";
import Main from "./Main";
import { Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.user);
  console.log(user);
  const isFilterMenuOpen = useSelector((state) => state.ui.isFilterMenuOpen);
  const navigate = useNavigate();

  // Manage the active link state
  const [activeLink, setActiveLink] = useState("");

  // Define the links in an array
  const links = [
    { path: "/dashboard", name: "Dashboard" },
    { path: "/dashboard/users-table", name: "Users" },
    { path: "/dashboard/events-table", name: "Events" },
    { path: "/dashboard/jobs-table", name: "Jobs" },
    { path: "/dashboard/jobseekers-table", name: "JobSeekers" },
    { path: "/dashboard/blogs-table", name: "Blogs" },
  ];

  const handleCloseFilterMenu = (e) => {
    if (e.target.classList.contains("filter-modal")) {
      dispatch(closeFilterMenu());
    }
  };

  return (
    <div className="mt-14">
      <div className="grid md:grid-cols-4 gap-x-14">
        <div className="md:col-span-1 row-start-3 md:row-start-auto h-screen md:sticky top-0">
          <div
            className={`filter-modal ${isFilterMenuOpen ? "open" : ""}`}
            onClick={handleCloseFilterMenu}
          >
            <div className={`filter-dialog ${isFilterMenuOpen ? "open" : ""}`}>
              {/* Card Wrapper with Full Height */}
              <div className="bg-white dark:bg-dark-card shadow-lg rounded-lg p-4 h-screen">
                <div className="flex-center-between border-b dark:border-slate-800 md:hidden">
                  <div
                    className="icon-box md:hidden"
                    onClick={() => dispatch(closeFilterMenu())}
                  >
                    <FiDelete />
                  </div>
                </div>
                <ul className="mt-8 space-y-2">
                  {links.map(({ path, name }) => (
                    <li key={path}>
                    <Link
  to={path}
  onClick={() => {
    setActiveLink(path); 
    navigate(path);
    dispatch(closeFilterMenu());
  }}
  className={`block p-3 rounded-md transition-all duration-300 ease-in-out ${
    activeLink === path
      ? "bg-primary text-white"
      : "text-gray-700 dark:text-gray-200 hover:text-primary"
  } ${
    activeLink !== path ? "hover:decoration-2" : "hover:text-white"
  }`}
>
  {name}
</Link>

                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 mt-5 md:mt-0 h-fit md:sticky top-0">
          <div
            className="flex-align-center gap-4"
            onClick={() => dispatch(openFilterMenu())}
          >
            <div className="md:hidden icon-box bg-white dark:bg-dark-card card-shadow dark:shadow-none card-bordered !rounded-md">
              <MdMenuOpen />
            </div>
          </div>
          <Routes>
            <Route
              path="/"
              element={user?.isAdmin ? <Main /> : <Navigate to="/" />}
            />

            {/* Protected Routes: Only admins can access these */}
            <Route
              path="users-table"
              element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
            />
            <Route
              path="jobs-table"
              element={user?.isAdmin ? <JobsTable /> : <Navigate to="/" />}
            />
            <Route
              path="jobseekers-table"
              element={user?.isAdmin ? <JobSeekersTable /> : <Navigate to="/" />}
            />
            <Route
              path="events-table"
              element={user?.isAdmin ? <EventsTable /> : <Navigate to="/" />}
            />
            <Route
              path="blogs-table"
              element={user?.isAdmin ? <BlogsTable /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


