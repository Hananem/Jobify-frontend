import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../../redux/profileSlice'; // Adjust the path based on your structure
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
const History = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);
console.log(user)
  // Get userId from the Redux state
  const userId = useSelector((state) => state.user?.user?.user?._id);  // Adjust if needed based on your user schema

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId)); // Use userId from Redux state
    }
  }, [dispatch, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto my-14 p-4">
      <h1 className="text-3xl font-bold mb-6">History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Saved Jobs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 p-4  border-l-[4px] border-secondaryLightRed">Saved Jobs</h2>
          <ul>
            {user.savedJobs && user.savedJobs.length > 0 ? (
              user.savedJobs.map((job) => (
                <li key={job._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={job.company.logo.url}
                      alt={`${job.company.name} logo`}
                      className="w-16 h-16 rounded-xl mr-4"
                    />
                    <div>
                      <Link to={`/jobs/${job._id}`}>
                        <h2 className="text-xl font-bold text-primary">{job.jobTitle}</h2>
                      </Link>
                      <p className="text-sm text-[#364a44] mb-2">{job.jobType}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{job.company.name}</p>
                  <p className="text-gray-500 text-sm">{job.location}</p>
                  <p className="text-green-600 font-medium mt-2">
                    ${job.salary?.min} - ${job.salary?.max}
                  </p>
                </li>
              ))
            ) : (
              <p>No saved jobs yet.</p>
            )}
          </ul>
        </section>

        {/* Posted Jobs */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 p-4  border-l-[4px] border-secondaryRed">Posted Jobs</h2>
          <ul>
            {user.postedJobs && user.postedJobs.length > 0 ? (
              user.postedJobs.map((job) => (
                <li key={job._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4">
                  <div className="flex items-center mb-4">
                    <img
                      src={job.company.logo.url}
                      alt={`${job.company.name} logo`}
                      className="w-16 h-16 rounded-xl mr-4"
                    />
                    <div>
                      <Link to={`/jobs/${job._id}`}>
                        <h2 className="text-xl font-bold text-primary">{job.jobTitle}</h2>
                      </Link>
                      <p className="text-sm text-[#364a44] mb-2">{job.jobType}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{job.company.name}</p>
                  <p className="text-gray-500 text-sm">{job.location}</p>
                  <p className="text-green-600 font-medium mt-2">
                    ${job.salary?.min} - ${job.salary?.max}
                  </p>
                </li>
              ))
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </ul>
        </section>

        {/* Applied Jobs */}
       
<section>
  <h2 className="text-2xl font-semibold mb-4 p-4 border-l-[4px] border-secondaryLightPurple">Applied Jobs</h2>
  <ul>
    {user.appliedJobs && user.appliedJobs.length > 0 ? (
      user.appliedJobs.map((job) => (
        <li key={job._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4">
          <div className="flex items-center mb-4">
            <img
              src={job.company.logo.url}
              alt={`${job.company.name} logo`}
              className="w-16 h-16 rounded-xl mr-4"
            />
            <div>
              <Link to={`/jobs/${job._id}`}>
                <h2 className="text-xl font-bold text-primary">{job.jobTitle}</h2>
              </Link>
              <p className="text-sm text-[#364a44] mb-2">{job.jobType}</p>
            </div>
          </div>
          <p className="text-gray-600">{job.company.name}</p>
          <p className="text-gray-500 text-sm">{job.location}</p>
          <p className="text-green-600 font-medium mt-2">
            ${job.salary?.min} - ${job.salary?.max}
          </p>
        </li>
      ))
    ) : (
      <p>No jobs applied for yet.</p>
    )}
  </ul>
</section>


      

        {/* Interested Events */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 p-4  border-l-[4px] border-secondaryRed">Interested Events</h2>
          <ul>
            {user.interestedEvents && user.interestedEvents.length > 0 ? (
              user.interestedEvents.map((event) => (
                <li key={event._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4 flex flex-col">
                  <Link to="/events" className="text-primary">
                    {event.title}
                  </Link>
                  <Moment format="MMMM Do YYYY, h:mm a">{event.date}</Moment>
                  <div className="flex mt-2 ">
                    <img
                      src={event.company.logo.url}
                      alt=""
                      className="w-12 h-12 rounded-xl mr-4"
                    />
                    <p>{event.company.name}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No events interested in yet.</p>
            )}
          </ul>
        </section>

        {/* Hired Job Posts */}
   {/* Users That You Hired */}
   <section>
  <h2 className="text-2xl font-semibold mb-4 p-4 border-l-[4px] border-primary">
    Users That You Hired
  </h2>
  <ul>
    {user.hiredJobPosts && user.hiredJobPosts.length > 0 ? (
      user.hiredJobPosts.map((post) => (
        <li
          key={post._id}
          className="flex flex-col p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4"
        >
          {/* User Profile Information */}
          <div className="flex items-start space-x-4 mb-4">
            {post.user?.profilePhoto?.url ? (
              <img
                src={post.user.profilePhoto.url} // Accessing the profile photo URL
                alt={`${post.user.username || 'Unknown User'}'s profile`}
                className="w-16 h-16 object-cover rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full">
                <span className="text-gray-500">No Photo</span>
              </div>
            )}
            <div>
              {/* Clickable Username */}
              {post.user && post.user._id && post.user.username ? (
  <Link
    to={`/profile/${post.user._id}`}
    className="text-xl font-semibold text-primary hover:underline"
  >
    {post.user.username}
  </Link>
) : (
  <p className="text-xl font-semibold text-gray-700">Unknown User</p>
)}
              <p className="text-sm text-gray-500">
                {post.experienceLevel || 'Experience level not specified'}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap mt-2">
            {post.skills && post.skills.length > 0 ? (
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
        </li>
      ))
    ) : (
      <p>No job seeker posts hired for yet.</p>
    )}
  </ul>
</section>



      </div>
    </div>
  );
};

export default History;

