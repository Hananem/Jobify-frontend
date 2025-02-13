import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlogById, updateBlogImageById } from '../../redux/blogSlice';
import { FaImage } from 'react-icons/fa6'; // Import the image icon

const UpdateBlogModal = ({ isOpen, closeModal, blog }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user?.user?.token);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    imageFile: null,
  });
  const [previewImage, setPreviewImage] = useState(blog?.image?.url || '');
  
  // Effect to set initial state if blog changes
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        imageFile: null,
      });
      setPreviewImage(blog.image.url || '');
    }
  }, [blog]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, imageFile: files[0] });
      setPreviewImage(URL.createObjectURL(files[0])); // Show new image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update image if a new file is selected
      if (formData.imageFile) {
        await dispatch(updateBlogImageById({ id: blog._id, imageFile: formData.imageFile, token }));
      }

      // Update blog content (if needed)
      await dispatch(updateBlogById({ id: blog._id, blogData: { title: formData.title, content: formData.content }, token }));
      
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="card rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Update Blog</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-input relative mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
            <label >Title</label>

          </div>

          <div className="form-input relative mb-4">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="input"
              required
            ></textarea>
            <label >Content</label>

          </div>

          {/* Display Current Image */}
          <div className="mb-4">
            <label >Current Image</label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Current Blog Image"
                className="h-40 w-full object-cover rounded-md border border-gray-300 mb-2"
              />
            )}
            {!previewImage && (
              <p className="text-gray-500">No current image available.</p>
            )}
          </div>

          {/* Upload New Image */}
          <div className="mb-4">
            <label >Upload New Image</label>
            <div className="relative mt-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="imageUpload" // Add an ID for the input
              />
              <div
                className="cursor-pointer w-full h-32 flex items-center justify-center border border-gray-300 rounded-md"
                onClick={() => document.getElementById('imageUpload').click()} // Trigger file input on div click
              >
                {formData.imageFile ? (
                  <img
                    src={URL.createObjectURL(formData.imageFile)}
                    alt="New Image Preview"
                    className="w-full h-32 object-cover rounded-md border border-gray-300"
                  />
                ) : (
                  <FaImage className="text-gray-400 text-6xl" />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              className="btn btn-primary-light"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogModal;




