import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addItem(product._id, 1);
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to cart');
    }
  };

  return (
    <div className="card group">
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-gray-100 p-8">
        <img
          src={product.image && product.image !== 'no-image.jpg' 
            ? `http://localhost:5000/uploads/${product.image}` 
            : `https://placehold.co/400x400?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-3 rounded-2xl shadow-sm transition-all duration-300 backdrop-blur-md ${
            isInWishlist(product._id) 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <span className="bg-white p-3 rounded-2xl shadow-lg text-gray-700 hover:text-primary-600 transition-colors translate-y-4 group-hover:translate-y-0 duration-300">
            <Eye size={20} />
          </span>
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-4 left-4 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-red-600 font-black uppercase tracking-widest text-sm">
            Out of Stock
          </div>
        )}
      </Link>

      <div className="p-8">
        <div className="mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.category?.name || 'Category'}
          </span>
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-4 rounded-2xl transition-all duration-200 ${
              product.stock === 0
                ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200 active:scale-95'
            }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
