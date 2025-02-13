import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../../redux/blogSlice';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs = [], status, error } = useSelector((state) => state.blogs);
console.log(blogs)
  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  if (status === 'loading') {
    return  <div className="col-span-full flex justify-center items-center h-32">
    <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
    <span className="ml-2 text-gray-600">Loading</span>
  </div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {blogs.map((blog) => {
          const { _id, title, content, image, author } = blog;
          const authorName = author?.username || 'Unknown Author';
          const imageUrl = image?.url ;
          const contentPreview = content ? content.substring(0, 100) : 'No content available';

          return (
            <div key={_id} className="card shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={imageUrl}
                alt={title || 'No title'}
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{title || 'No title'}</h2>
                <p className="text-gray-700 mb-4">{contentPreview}...</p>
                <div className="flex items-center">
                  <span className="text-gray-600 text-sm">By {authorName}</span>
                  <a
                    href={`/blogs/${_id}`}
                    className="ml-auto text-primary hover:underline"
                  >
                    Read More 
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;

