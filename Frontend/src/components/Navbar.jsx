import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Heart, Info, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600 tracking-tight">EcoShop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Contact</Link>
            {user?.role === 'Admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-primary-600 font-bold text-sm uppercase tracking-widest transition-colors">Admin</Link>
            )}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="w-px h-6 bg-gray-100 mx-2"></div>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 font-bold">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm">{user.name.split(' ')[0]}</span>
                </Link>
                <Link to="/dashboard" className="p-2 text-gray-400 hover:text-primary-600 transition-colors" title="My Orders">
                  <User size={22} />
                </Link>
                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-primary-600">Login</Link>
                <Link to="/register" className="btn btn-primary px-4 py-2 text-sm">Join</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-400">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-primary-600 text-white text-[8px] px-1 rounded-full">{cartCount}</span>}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2">
          <Link to="/" className="block py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="block py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/wishlist" className="flex items-center justify-between py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>
            <span>Wishlist</span>
            <span className="text-red-500">{wishlist.length}</span>
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="block py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <Link to="/dashboard" className="block py-3 text-gray-600 font-bold" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              <button onClick={handleLogout} className="w-full text-left py-3 text-red-600 font-bold">Logout</button>
            </>
          ) : (
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Link to="/login" className="btn btn-secondary text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary text-center" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
