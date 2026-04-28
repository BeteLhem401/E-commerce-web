import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product) => {
    addItem(product._id, 1);
    removeFromWishlist(product._id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Heart size={48} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Save items you love to your wishlist and they will appear here.
        </p>
        <Link to="/" className="btn btn-primary px-8 py-3 text-lg">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4">
        My Wishlist <span className="text-gray-400 font-medium text-2xl">({wishlist.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group">
            <div className="relative aspect-square bg-gray-50 p-8">
              <img 
                src={`https://placehold.co/400x400?text=${encodeURIComponent(product.name)}`} 
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 rounded-2xl shadow-sm transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <span className="text-xs font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {product.category?.name || 'Category'}
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => handleMoveToCart(product)}
                  className="flex-1 btn btn-primary flex items-center justify-center gap-2 py-3"
                >
                  <ShoppingCart size={18} /> Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
