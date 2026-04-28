import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import { Package, Users, ShoppingBag, Plus, Edit, Trash2, CheckCircle, Clock, Truck } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: null
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes, userRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/admin/orders'),
        api.get('/admin/users'),
        api.get('/admin/categories')
      ]);
      setProducts(prodRes.data.data);
      setOrders(orderRes.data.data);
      setUsers(userRes.data.data);
      setCategories(catRes.data.data);
    } catch (err) {
      console.error('Error fetching admin data', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category?._id || product.category || '',
      image: null
    });
    setShowProductForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);
    formData.append('category', newProduct.category);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    try {
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setNewProduct({ name: '', description: '', price: '', stock: '', category: '', image: null });
      setEditingProduct(null);
      setShowProductForm(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/admin/products/${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Admin Console</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-gray-400 font-bold text-sm uppercase mb-1">Total Products</span>
            <span className="text-4xl font-black text-gray-900">{products.length}</span>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
            <Package size={32} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-gray-400 font-bold text-sm uppercase mb-1">Total Orders</span>
            <span className="text-4xl font-black text-gray-900">{orders.length}</span>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl text-green-600">
            <ShoppingBag size={32} />
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="block text-gray-400 font-bold text-sm uppercase mb-1">Total Users</span>
            <span className="text-4xl font-black text-gray-900">{users.length}</span>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl text-amber-600">
            <Users size={32} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
        {['products', 'orders', 'users'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-black text-sm uppercase tracking-widest transition-all ${
              activeTab === tab
                ? 'border-b-4 border-primary-600 text-primary-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
        {activeTab === 'products' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900">Manage Products</h2>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setNewProduct({ name: '', description: '', price: '', stock: '', category: '', image: null });
                  setShowProductForm(!showProductForm);
                }}
                className="btn btn-primary flex items-center gap-2"
              >
                <Plus size={20} /> {showProductForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showProductForm && (
              <div className="mb-12 space-y-12 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Add Category Section */}
                {!editingProduct && (
                  <div className="bg-white p-8 rounded-3xl border border-primary-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Plus size={20} className="text-primary-600" /> Quick Add Category
                    </h3>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        id="category-name"
                        placeholder="Category Name (e.g. Electronics)"
                        className="input flex-1"
                      />
                      <button 
                        onClick={async () => {
                          const name = document.getElementById('category-name').value;
                          if (!name) return alert('Enter category name');
                          try {
                            await api.post('/admin/categories', { name });
                            document.getElementById('category-name').value = '';
                            fetchData();
                          } catch (err) {
                            alert('Error adding category');
                          }
                        }}
                        className="btn btn-primary whitespace-nowrap"
                      >
                        Add Category
                      </button>
                    </div>
                  </div>
                )}

                {/* Add/Edit Product Form */}
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                  <h3 className="text-xl font-bold mb-6">{editingProduct ? 'Edit Product' : 'New Product Details'}</h3>
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                      <select
                        required
                        className="input"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                      <textarea
                        required
                        className="input min-h-[100px]"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        className="input"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
                      <input
                        type="number"
                        required
                        className="input"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        {editingProduct ? 'Change Image (Optional)' : 'Product Image'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className="input pt-2"
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.files[0]})}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="btn btn-primary w-full py-3 text-lg font-bold">
                        {editingProduct ? 'Update Product' : 'Create Product'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-4 pr-4">Product</th>
                    <th className="pb-4 px-4">Category</th>
                    <th className="pb-4 px-4">Price</th>
                    <th className="pb-4 px-4">Stock</th>
                    <th className="pb-4 pl-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((product) => (
                    <tr key={product._id} className="group">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gray-50 p-1">
                            <img 
                              src={product.image && product.image !== 'no-image.jpg' 
                                ? `http://localhost:5000/uploads/${product.image}` 
                                : `https://placehold.co/100x100?text=${product.name.charAt(0)}`} 
                              alt="" 
                              className="w-full h-full object-contain" 
                            />
                          </div>
                          <span className="font-bold text-gray-900 truncate max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                          {product.category?.name || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-black text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-500' : 'text-gray-500'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditClick(product)}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Manage Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs font-black uppercase tracking-widest border-b border-gray-50">
                    <th className="pb-4 pr-4">Order ID</th>
                    <th className="pb-4 px-4">Customer</th>
                    <th className="pb-4 px-4">Total</th>
                    <th className="pb-4 px-4">Status</th>
                    <th className="pb-4 pl-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="py-4 pr-4 font-bold text-gray-400 text-sm">#{order._id.slice(-8).toUpperCase()}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{order.user?.name}</span>
                          <span className="text-xs text-gray-400">{order.user?.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-black text-primary-600">${order.totalPrice.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-right">
                        <select
                          className="bg-gray-50 border-none rounded-lg text-xs font-black uppercase tracking-tighter px-3 py-2 outline-none focus:ring-2 focus:ring-primary-600"
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="p-8">
            <h2 className="text-2xl font-black text-gray-900 mb-8">System Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div key={user._id} className="p-6 border border-gray-100 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-black">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{user.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <span className="mt-2 inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
