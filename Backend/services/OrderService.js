const mongoose = require('mongoose');
const orderRepository = require('../repositories/OrderRepository');
const cartRepository = require('../repositories/CartRepository');
const productRepository = require('../repositories/ProductRepository');
const Payment = require('../models/Payment');

class OrderService {
  async checkout(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await cartRepository.findOne({ user: userId }, 'items.product');
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      let totalPrice = 0;
      const orderItems = [];

      for (const item of cart.items) {
        const product = await productRepository.findById(item.product, '', { session });
        if (!product) {
          throw new Error(`Product ${item.product} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        // Update stock
        product.stock -= item.quantity;
        await product.save({ session });

        totalPrice += product.price * item.quantity;
        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price
        });
      }

      const order = await orderRepository.create({
        user: userId,
        items: orderItems,
        totalPrice
      }, { session });

      // Create dummy payment
      await Payment.create([{
        order: order._id,
        amount: totalPrice,
        status: 'Completed' // Simulating successful payment
      }], { session });

      // Clear cart
      cart.items = [];
      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async getMyOrders(userId) {
    return await orderRepository.findAll({ user: userId });
  }

  async getOrderDetails(orderId, userId) {
    const order = await orderRepository.findById(orderId, 'items.product');
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    if (order.user.toString() !== userId.toString()) {
      const error = new Error('Not authorized to view this order');
      error.statusCode = 403;
      throw error;
    }

    return order;
  }
}

module.exports = new OrderService();
