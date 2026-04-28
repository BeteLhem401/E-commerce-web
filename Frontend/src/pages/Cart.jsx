import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const Cart = () => {
  const { cart, loading, updateItem, removeItem, cartTotal } = useCart();
  const navigate = useNavigate();

  if (loading && !cart) return <Loader fullPage />;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-primary-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-primary-600" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love.
        </p>
        <Link to="/" className="btn btn-primary px-8 py-3 text-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4">
        Shopping Cart <span className="text-gray-400 font-medium text-2xl">({cart.items.filter(item => item.product).length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.items.filter(item => item.product).map((item) => (
            <div key={item.product._id} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow duration-300">
              <div className="w-full sm:w-32 aspect-square rounded-xl bg-gray-50 p-2 shrink-0">
                <img
                  src={`https://placehold.co/400x400?text=${encodeURIComponent(item.product.name)}`}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm">{item.product.category?.name || 'Category'}</p>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await removeItem(item.product._id);
                      } catch (err) {
                        alert(err.response?.data?.message || 'Failed to remove item');
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-6">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={async () => {
                        try {
                          await updateItem(item.product._id, Math.max(1, item.quantity - 1));
                        } catch (err) {
                          alert(err.response?.data?.message || 'Failed to update item');
                        }
                      }}
                      className="px-3 py-1.5 hover:bg-gray-100 font-black"
                    >-</button>
                    <span className="px-4 py-1.5 font-bold border-x border-gray-200 min-w-[40px] text-center">{item.quantity}</span>
                    <button
                      onClick={async () => {
                        try {
                          await updateItem(item.product._id, item.quantity + 1);
                        } catch (err) {
                          alert(err.response?.data?.message || 'Failed to update item');
                        }
                      }}
                      className="px-3 py-1.5 hover:bg-gray-100 font-black"
                    >+</button>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm text-gray-400 font-medium">${item.product.price?.toFixed(2)} / unit</span>
                    <span className="text-2xl font-black text-primary-600">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium">
                <span>Estimated Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">
                <span className="text-xl font-black text-gray-900">Total</span>
                <span className="text-3xl font-black text-primary-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn btn-primary py-4 flex items-center justify-center gap-2 text-lg font-black"
            >
              Checkout <ArrowRight size={22} />
            </button>

            <p className="text-center text-gray-400 text-xs mt-6">
              100% Secure Payment powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
