import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogCount } from '../../redux/blogSlice'; // Adjust the import path as needed
import { FaBloggerB } from "react-icons/fa6";

const BlogCount = () => {
  const dispatch = useDispatch();
  const { totalCount, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    const fetchCount = async () => {
      await dispatch(fetchBlogCount());
    };

    fetchCount();
  }, [dispatch]);

  return (
    <div className="bg-[#ff6b6b] text-white relative shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-center">
        {/* Loading State */}
        {status === 'loading' && (
          <p className="text-lg animate-pulse">Loading...</p>
        )}

        {/* Error State */}
        {status === 'failed' && (
          <p className="text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </p>
        )}

        {/* Success State */}
        {status === 'succeeded' && (
          <>
            <h2 className="text-xl font-semibold">Total Blogs</h2>
            <p className="mt-2 text-3xl font-bold">{totalCount}</p>
          </>
        )}
      </div>
      <FaBloggerB className='absolute bottom-0 left-0 opacity-50 text-6xl' />
    </div>
  );
};

export default BlogCount;


