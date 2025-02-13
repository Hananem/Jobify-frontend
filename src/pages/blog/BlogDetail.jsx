import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../../redux/blogSlice';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment'; // Import Moment

const BlogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, status, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="text-center py-4">
        <div className="loader"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-secondaryRed">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-4 text-secondaryRed">Blog not found</div>;
  }

  const authorName = blog.author?.username || "Unknown Author"; 

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 mt-14 m">
      <h1 className="text-3xl font-bold mb-4 text-primary">{blog.title}</h1>
      <div className="flex flex-center-between text-gray-600 text-sm">
        {blog.author && (
          <div className="flex items-center gap-x-4 mt-4 mb-8">
            <div className='flex items-center gap-2'>
              {blog.author.profilePhoto?.url && (
                <img
                  src={blog.author.profilePhoto.url}  // Corrected the path for profile photo
                  alt={`${blog.author.username}'s Profile`}
                  className="h-10 w-10 rounded-full mr-2"
                />
              )}
              <p className="text-sm text-gray-600"> {blog.author.username}</p>
            </div>
            <span>
              {/* Use Moment to format the date */}
              <Moment format="MMMM Do YYYY, h:mm:ss a">{blog.createdAt}</Moment>
            </span>
          </div>
        )}
      </div>
      <img
        className="w-full h-72 object-cover mb-4 rounded-md shadow-light"
        src={blog.image?.url || 'default-image.png'} // Safe check for image URL
        alt={blog.title}
      />
      <p className="text-gray-700 mb-4">{blog.content}</p>
    </div>
  );
};

export default BlogDetail;


