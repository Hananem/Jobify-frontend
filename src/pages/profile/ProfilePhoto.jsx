import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import { uploadProfilePhoto } from '../../redux/profileSlice';

const ProfilePhoto = ({ currentPhoto, token }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.profile);
  const [previewPhoto, setPreviewPhoto] = useState(currentPhoto?.url || 'default-photo.png');
  const [loading, setLoading] = useState(false); // Local loading state

  const currentUserId = useSelector((state) => state.user?.user?.user?._id); // Logged-in user's ID
  const profileOwnerId = useSelector((state) => state.profile?.user?._id); // Profile owner's ID

  // Update previewPhoto when currentPhoto or profileOwnerId changes
  useEffect(() => {
    setPreviewPhoto(currentPhoto?.url || 'default-photo.png');
  }, [currentPhoto, profileOwnerId]);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('photo', file);

      // Preview the selected image before uploading
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result); // Set the preview
      };
      reader.readAsDataURL(file); // Create preview URL

      setLoading(true); // Set loading to true when uploading starts

      dispatch(uploadProfilePhoto({ formData, token })).finally(() => {
        setLoading(false); // Set loading to false when the upload finishes (success or failure)
      });
    } else {
      alert('Please select a valid image file');
    }
  };

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Profile image preview */}
      <img
        src={previewPhoto}
        alt="Profile"
        className={`w-32 h-32 rounded-full object-cover border-2 border-gray-300 ${
          loading ? 'opacity-50' : ''
        }`}
      />
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full z-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-primary border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {/* Error message */}
      {error && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs text-center py-1 rounded-b z-10">
          Error uploading photo. Please try again.
        </div>
      )}
      {/* Camera Icon (visible only for the profile owner) */}
      {currentUserId === profileOwnerId && (
        <>
          <label
            htmlFor="fileInput"
            className="absolute bottom-1 right-1 bg-white rounded-full p-2 cursor-pointer shadow-lg border"
          >
            <FaCamera className="text-black text-lg" />
          </label>
          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept="image/*" // Only accept image files
            onChange={handleProfilePhotoChange}
            className="hidden"
            disabled={loading} // Disable input during upload
            aria-label="Upload profile photo"
          />
        </>
      )}
    </div>
  );
};

export default ProfilePhoto;





