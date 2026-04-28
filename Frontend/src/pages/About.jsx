import React from 'react';
import { ShoppingBag, ShieldCheck, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-32">
          <span className="text-primary-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Our Story</span>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight">
            We're on a mission to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400">redefine commerce.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            EcoShop was founded in 2026 with a simple idea: premium products shouldn't cost the earth. We've built a curated platform that connects quality craftsmanship with conscious consumers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          <div className="p-10 rounded-[2rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-primary-100/30 transition-all duration-500">
            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-8">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Curated Selection</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Every product in our store is hand-vetted for quality and sustainability.</p>
          </div>
          <div className="p-10 rounded-[2rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 lg:translate-y-12">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Shopping</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Advanced encryption and secure payment gateways protect your data.</p>
          </div>
          <div className="p-10 rounded-[2rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-amber-100/30 transition-all duration-500">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-8">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
            <p className="text-gray-500 leading-relaxed text-sm">Our global logistics network ensures your items arrive in record time.</p>
          </div>
          <div className="p-10 rounded-[2rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-green-100/30 transition-all duration-500 lg:translate-y-12">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
            <p className="text-gray-500 leading-relaxed text-sm">We ship to over 150 countries with carbon-neutral operations.</p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-primary-600 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Crafting the future of retail experience.</h2>
            <p className="text-lg text-primary-100 leading-relaxed mb-10 opacity-80">
              Our vision is to become the world's most trusted platform for high-end, sustainable goods. We believe that technology can be a force for good in the global supply chain.
            </p>
            <div className="flex flex-wrap gap-12">
              <div>
                <span className="block text-4xl font-black mb-1">500k+</span>
                <span className="text-primary-200 text-sm font-bold uppercase tracking-widest">Happy Users</span>
              </div>
              <div>
                <span className="block text-4xl font-black mb-1">120+</span>
                <span className="text-primary-200 text-sm font-bold uppercase tracking-widest">Global Brands</span>
              </div>
              <div>
                <span className="block text-4xl font-black mb-1">99.9%</span>
                <span className="text-primary-200 text-sm font-bold uppercase tracking-widest">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="absolute right-[-10%] top-[-20%] w-2/3 h-[150%] bg-gradient-to-br from-white/10 to-transparent rotate-12 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
