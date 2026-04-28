import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Lock, Save, Camera } from 'lucide-react';
import api from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, you'd have an endpoint like /api/auth/profile
      // For now, we simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-12">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl font-black">
                {user?.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full border-4 border-white shadow-lg hover:bg-primary-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
            <p className="text-gray-400 text-sm">{user?.role}</p>
          </div>
          
          <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col gap-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-50 text-primary-600 font-bold text-sm">
              <User size={18} /> Personal Info
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors">
              <Shield size={18} /> Security
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-3xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Personal Information</h4>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      className="input pl-12"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      disabled
                      className="input pl-12 opacity-50 cursor-not-allowed"
                      value={formData.email}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <h4 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Change Password</h4>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      className="input pl-12"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary w-full py-4 flex items-center justify-center gap-2 font-bold"
              >
                {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
