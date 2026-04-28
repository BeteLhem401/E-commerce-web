import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error('Error fetching product', err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addItem(product._id, quantity);
      // Optional toast
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding to cart');
    }
    setAdding(false);
  };

  if (loading) return <Loader fullPage />;
  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <button onClick={() => navigate('/')} className="mt-4 text-primary-600 font-bold flex items-center justify-center gap-2 mx-auto">
        <ArrowLeft size={20} /> Back to shop
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm sticky top-32">
            <img 
              src={product.image && product.image !== 'no-image.jpg' 
                ? `http://localhost:5000/uploads/${product.image}` 
                : `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`} 
              alt={product.name}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
              {product.category?.name}
            </span>
          </div>

          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
            </div>
            <span className="text-gray-400 text-sm font-medium">(4.8 / 5.0) • 128 Reviews</span>
          </div>

          <div className="mb-8">
            <span className="text-4xl font-black text-primary-600">${product.price.toFixed(2)}</span>
            <span className="ml-4 text-gray-400 line-through text-lg">${(product.price * 1.2).toFixed(2)}</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          {/* Add to Cart Section */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 font-black text-xl transition-colors"
                >-</button>
                <span className="px-6 py-2 font-bold text-lg min-w-[60px] text-center border-x-2 border-gray-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 font-black text-xl transition-colors"
                >+</button>
              </div>
              <span className="text-gray-500 font-medium text-sm">
                {product.stock > 0 ? `${product.stock} pieces available` : 'Out of stock'}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || adding}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-lg transition-all shadow-lg ${
                product.stock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700 active:scale-[0.98]'
              }`}
            >
              <ShoppingCart size={24} />
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-primary-100 transition-colors">
              <Truck size={24} className="text-primary-600 mb-2" />
              <span className="text-xs font-bold text-gray-900">Free Delivery</span>
              <span className="text-[10px] text-gray-400">On orders over $50</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-primary-100 transition-colors">
              <RotateCcw size={24} className="text-primary-600 mb-2" />
              <span className="text-xs font-bold text-gray-900">30-Day Return</span>
              <span className="text-[10px] text-gray-400">Money back guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-primary-100 transition-colors">
              <ShieldCheck size={24} className="text-primary-600 mb-2" />
              <span className="text-xs font-bold text-gray-900">Secure Payment</span>
              <span className="text-[10px] text-gray-400">100% Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
