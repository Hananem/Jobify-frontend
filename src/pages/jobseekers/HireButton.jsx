import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHireJobSeekerPost } from '../../redux/userSlice';

// HireButton component
const HireButton = ({ postId, hiredUserId, employerId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user?.user);
  const hiredJobPosts = user?.hiredJobPosts || [];
  console.log(postId)
  console.log(hiredJobPosts)
  const isHired = hiredJobPosts.includes(postId);

  const handleClick = () => {
    dispatch(toggleHireJobSeekerPost({ jobSeekerPostId: postId, hiredUserId, employerId }));
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2  ${isHired ? 'btn btn-primary-light' : 'btn btn-primary'} flex justify-end rounded`}
    >
      {isHired ? 'Unhire' : 'Hire'}
    </button>
  );
};

export default HireButton;