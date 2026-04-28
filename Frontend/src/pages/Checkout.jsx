import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders/checkout');
      setCompleted(true);
      clearCart();
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Error processing order');
    }
    setLoading(false);
  };

  if (completed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-in fade-in zoom-in duration-700">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={56} className="text-green-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
          Thank you for your purchase. We've sent an email confirmation to your inbox.
        </p>
        <p className="text-primary-600 font-bold">Redirecting you to your dashboard...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return navigate('/cart');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium transition-colors"
      >
        <ArrowLeft size={20} /> Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Form */}
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-10 flex items-center gap-4">
            <Truck className="text-primary-600" size={32} /> Shipping Details
          </h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="input h-12"
                  placeholder="123 Main St"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="input h-12"
                    placeholder="New York"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    className="input h-12"
                    placeholder="10001"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  required
                  className="input h-12"
                  placeholder="United States"
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-12 mb-10 flex items-center gap-4">
              <CreditCard className="text-primary-600" size={32} /> Payment Info
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  className="input h-12"
                  placeholder="XXXX XXXX XXXX XXXX"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    required
                    className="input h-12"
                    placeholder="MM/YY"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    className="input h-12"
                    placeholder="123"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Review */}
        <div className="lg:sticky lg:top-32 h-fit">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Order Review</h2>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-8 custom-scrollbar">
              {cart.items.filter(item => item.product).map((item) => (
                <div key={item.product._id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-1 shrink-0">
                    <img
                      src={`https://placehold.co/100x100?text=${encodeURIComponent(item.product.name)}`}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.product.name}</h4>
                    <span className="text-gray-400 text-xs">{item.quantity} x ${item.product.price.toFixed(2)}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">${(item.quantity * item.product.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-3">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-gray-900">
                <span>Total Amount</span>
                <span className="text-primary-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full btn btn-primary py-4 mt-10 flex items-center justify-center gap-2 text-lg font-black"
            >
              {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
