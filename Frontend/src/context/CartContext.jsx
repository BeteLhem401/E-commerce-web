import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setCart(res.data.data);
    } catch (err) {
      console.error('Failed to fetch cart', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addItem = async (productId, quantity) => {
    try {
      const res = await api.post('/cart', { productId, quantity });
      setCart(res.data.data);
    } catch (err) {
      throw err;
    }
  };

  const updateItem = async (productId, quantity) => {
    try {
      const res = await api.put(`/cart/${productId}`, { quantity });
      setCart(res.data.data);
    } catch (err) {
      throw err;
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCart(res.data.data);
    } catch (err) {
      throw err;
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  const cartCount = cart?.items?.filter(item => item.product).reduce((acc, item) => acc + item.quantity, 0) || 0;
  const cartTotal = cart?.items?.reduce((acc, item) => acc + (item.quantity * (item.product?.price || 0)), 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
