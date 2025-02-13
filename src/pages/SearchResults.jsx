import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { CiLocationOn } from "react-icons/ci";
import { MdWorkOutline } from "react-icons/md";
import { IoBrushOutline } from "react-icons/io5";
import { fetchSearchResults } from '../redux/searchSlice'; // Adjust path to your Redux action

const SearchResults = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query'); // Extract 'query' from the URL params

  const { blogs, jobs, jobSeekerPosts, events, users, status, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, query]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 mt-14 px-[6%] md:px-[30%] py-[0.35rem]">
      {/* Blogs Section */}
      {blogs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog?._id} className="card p-4 shadow-light transition-a flex items-center">
              {blog?.image ? (
                <img src={blog.image.url} alt={blog.title} className="w-16 h-16 mr-4 rounded" />
              ) : (
                <div className="w-16 h-16 mr-4 rounded bg-gray-300" />
              )}
              <div>
                <h3 className="font-semibold">
                  <Link to={`/blog/${blog._id}`} className="text-blue-500">
                    {blog.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.content.split(" ").slice(0, 30).join(" ")}...
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Jobs Section */}
      {jobs.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Jobs</h2>
          {jobs.map((job) => (
            <Link to={`/jobs/${job?._id}`} key={job?._id}>
              <div className="max-w-2/4 card p-4 shadow-light transition-a flex items-center">
                {job?.company?.logo?.url && (
                  <img src={job.company.logo.url} alt={job.company.name} className="w-16 h-16 mr-4 rounded" />
                )}
                <div>
                  <h3 className="font-semibold">{job.jobTitle}</h3>
                  <p>{job.company.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Job Seeker Posts Section */}
      {jobSeekerPosts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Job Seeker Posts</h2>
          {jobSeekerPosts.map((post) => (
            <div key={post?._id} className="card p-4 shadow-light transition-a flex">
              {post?.user?.profilePhoto ? (
                <img src={post.user.profilePhoto.url} alt={post.user.username} className="w-16 h-16 mr-4 rounded" />
              ) : (
                <div className="w-16 h-16 mr-4 rounded bg-gray-300" />
              )}
              <div>
                <h3 className="font-semibold">
                  <Link to={`/profile/${post.user._id}`} className="hover:underline">
                    {post.user.username}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600">{post.jobTitle}</p>
                <span className="text-muted flex items-center">
                  <IoBrushOutline />: {post.skills.join(', ')}
                </span>
                <span className="text-muted flex items-center">
                  <CiLocationOn />: {post?.location}
                </span>
                <span className="text-muted flex items-center">
                  <MdWorkOutline />: {post.experienceLevel}
                </span>
                <p className="text-muted">{post?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events Section */}
      {events.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Events</h2>
          {events.map((event) => (
            <div key={event?._id} className="card p-4 shadow-light transition-a flex items-center">
              <div className="flex items-center">
                {event?.company?.logo ? (
                  <img src={event.company.logo.url} alt={event.title} className="w-16 h-16 mr-4 rounded" />
                ) : (
                  <div className="w-16 h-16 mr-4 rounded bg-gray-300" />
                )}
                <span className="text-lg font-medium">{event.company?.name}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{event.title}</h3>
                <p>{event.description}</p>
                <p className="text-sm text-gray-600">
                  {event.date} - {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users Section */}
      {users.length > 0 && (
        <div>
          <h2 className="text-xl font-bold">Users</h2>
          {users.map((user) => (
            <div key={user?._id} className="card p-4 shadow-light transition-a flex items-center">
              <div className="mr-4">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto.url} alt={user.username} className="w-16 h-16 rounded-full" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">
                  <Link to={`/profile/${user._id}`}>{user.username}</Link>
                </h3>
                <p className="text-muted">{user.email}</p>
                {user.jobTitle && <p className="text-sm text-gray-600">{user.jobTitle}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;












































































































































































































































































































































































