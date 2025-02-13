import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../redux/blogSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaImage } from 'react-icons/fa';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For image preview
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal

  // Utility to strip HTML tags if needed
  const stripHtmlTags = (htmlContent) => htmlContent.replace(/<\/?[^>]+(>|$)/g, '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sanitizedContent = stripHtmlTags(content); // Sanitize content if plain text is needed
    const blogData = {
      title,
      content: sanitizedContent, // Use sanitized content here if plain text is required
      image,
    };

    dispatch(createBlog(blogData))
      .unwrap()
      .then(() => {
        // Reset form on success
        setTitle('');
        setContent('');
        setImage(null);
        setPreview(null);
        setError(null);
        setIsModalOpen(true); // Show success modal
      })
      .catch((error) => {
        console.error('Error creating blog:', error);
        setError(error.message); // Show error message
      });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="p-6 max-w-[700px] mx-auto rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block">Image</label>
          <div className="relative mt-1">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <div
              className="cursor-pointer w-full h-34 flex items-center justify-center border border-gray-300 rounded-md"
              onClick={() => document.getElementById('image').click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Blog Preview"
                  className="w-full h-full object-cover border border-gray-300 rounded-md"
                />
              ) : (
                <FaImage className="text-gray-400 text-6xl" />
              )}
            </div>
          </div>
        </div>

        {/* Title Input */}
        <div className="form-input relative mb-4">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <label htmlFor="title">Title</label>
        </div>

        {/* Content Editor */}
        <div className="mb-4">
          <label htmlFor="content" className="block">Content</label>
          <ReactQuill
            id="content"
            value={content}
            onChange={setContent}
            className="input"
            theme="snow"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Blog
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Blog Created Successfully!</h3>
            <p className="text-gray-700 mb-4">Your blog has been successfully created.</p>
            <button
              onClick={closeModal}
              className="btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;





