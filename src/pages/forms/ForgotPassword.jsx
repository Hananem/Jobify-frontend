import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPasswordLink } from '../../redux/passwordResetSlice';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.passwordReset);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordLink(email)); // Dispatch action to send reset link
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="card p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 bg-trasparent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;


