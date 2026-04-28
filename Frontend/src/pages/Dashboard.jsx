import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { Package, Clock, CheckCircle, Truck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/myorders');
        setOrders(res.data.data);
      } catch (err) {
        console.error('Error fetching orders', err);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={20} className="text-amber-500" />;
      case 'Shipped': return <Truck size={20} className="text-blue-500" />;
      case 'Delivered': return <CheckCircle size={20} className="text-green-500" />;
      default: return <Package size={20} className="text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">My Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, {user?.name}! Here's your order history.</p>
        </div>
        <div className="bg-primary-50 p-4 rounded-2xl border border-primary-100 flex items-center gap-4">
          <div className="bg-primary-600 p-2 rounded-xl text-white">
            <Package size={24} />
          </div>
          <div>
            <span className="block text-xs font-bold text-primary-600 uppercase">Total Orders</span>
            <span className="text-xl font-black text-gray-900">{orders.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-black text-gray-900">Order History</h2>
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-bold ${getStatusClass(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <span className="text-gray-400 font-medium">#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <span className="text-gray-500 font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div className="flex-1 space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-50 p-1">
                            <img src={`https://placehold.co/100x100?text=P`} alt="Product" className="w-full h-full object-contain opacity-50" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-gray-800 text-sm truncate">Product Item</span>
                            <span className="text-gray-400 text-xs">{item.quantity} x ${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="md:text-right border-t md:border-t-0 pt-4 md:pt-0">
                      <span className="block text-sm text-gray-400 font-bold mb-1">Total Amount</span>
                      <span className="text-3xl font-black text-primary-600">${order.totalPrice.toFixed(2)}</span>
                      <button className="mt-4 flex items-center gap-2 text-primary-600 font-black text-sm hover:underline ml-auto">
                        View Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border-2 border-dashed border-gray-100 py-20 text-center">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-bold text-lg">You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/')} className="mt-4 text-primary-600 font-black hover:underline">Start Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
