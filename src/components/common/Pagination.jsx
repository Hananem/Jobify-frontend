import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-primary text-white p-2 rounded-md mx-2 transition-colors duration-300 ease-in-out hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="mx-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-primary text-white p-2 rounded-md mx-2 transition-colors duration-300 ease-in-out hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
