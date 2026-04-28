import React from 'react';

const Loader = ({ fullPage = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'min-h-[70vh]' : 'py-12'}`}>
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
