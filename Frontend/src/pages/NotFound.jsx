import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[12rem] font-black text-gray-100 leading-none select-none">404</h1>
        <div className="relative -mt-24">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Oops! Page not found.</h2>
          <p className="text-gray-500 mb-12 max-w-md mx-auto text-lg leading-relaxed">
            The page you're looking for doesn't exist or has been moved to a new destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn btn-primary px-8 py-4 flex items-center justify-center gap-2 font-bold shadow-xl shadow-primary-200">
              <Home size={20} /> Back to Home
            </Link>
            <Link to="/" className="btn btn-secondary px-8 py-4 flex items-center justify-center gap-2 font-bold">
              <Search size={20} /> Search Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
