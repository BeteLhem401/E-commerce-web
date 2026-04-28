import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">Get in touch.</h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-lg">
            Have a question or feedback? We'd love to hear from you. Our team usually responds within 24 hours.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Email Us</h4>
                <p className="text-gray-500">support@ecoshop.com</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Call Us</h4>
                <p className="text-gray-500">+1 (234) 567-890</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Our Studio</h4>
                <p className="text-gray-500">123 Commerce St, New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-500">Thanks for reaching out. We'll get back to you soon.</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary mt-8">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                  <input type="text" required className="input" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                  <input type="text" required className="input" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" required className="input" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  required 
                  className="input min-h-[150px] pt-4" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button type="submit" className="w-full btn btn-primary py-4 flex items-center justify-center gap-2 text-lg font-black">
                Send Message <Send size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
