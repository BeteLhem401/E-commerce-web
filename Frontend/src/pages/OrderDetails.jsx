import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { Package, MapPin, CreditCard, ChevronLeft, Calendar, CheckCircle } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (err) {
        console.error('Error fetching order', err);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader fullPage />;
  if (!order) return <div className="text-center py-20">Order not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold mb-8 transition-colors">
        <ChevronLeft size={20} /> Back to My Orders
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Order Details</h1>
          <p className="text-gray-400 mt-2 font-bold">#{order._id.toUpperCase()}</p>
        </div>
        <div className="flex items-center gap-3 bg-primary-50 px-6 py-3 rounded-2xl">
          <CheckCircle className="text-primary-600" size={24} />
          <div>
            <span className="block text-xs font-black uppercase tracking-widest text-primary-400">Status</span>
            <span className="text-primary-700 font-black uppercase text-sm tracking-tighter">{order.status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar size={24} /></div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Date</h4>
            <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><MapPin size={24} /></div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Shipping Address</h4>
            <p className="text-gray-500 text-sm">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><CreditCard size={24} /></div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Payment Method</h4>
            <p className="text-gray-500 text-sm">Credit Card (Simulation)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">Order Items</h3>
        </div>
        <div className="p-8 space-y-6">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                  <Package className="text-gray-300" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.product?.name || 'Deleted Product'}</h4>
                  <p className="text-sm text-gray-400">Qty: {item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
              </div>
              <span className="font-black text-gray-900">${(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-8 flex justify-between items-center">
          <span className="text-xl font-black text-gray-900">Total Paid</span>
          <span className="text-3xl font-black text-primary-600">${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
