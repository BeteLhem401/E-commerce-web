const productRepository = require('../repositories/ProductRepository');
const categoryRepository = require('../repositories/CategoryRepository');
const orderRepository = require('../repositories/OrderRepository');
const userRepository = require('../repositories/UserRepository');

class AdminService {
  // Product Management
  async addProduct(productData) {
    return await productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    const product = await productRepository.updateById(id, productData);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await productRepository.deleteById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  // Category Management
  async addCategory(categoryData) {
    return await categoryRepository.create(categoryData);
  }

  async getAllCategories() {
    return await categoryRepository.findAll();
  }

  // User Management
  async getAllUsers() {
    return await userRepository.findAll();
  }

  // Order Management
  async getAllOrders() {
    return await orderRepository.findAll({}, {}, 'user');
  }

  async updateOrderStatus(orderId, status) {
    const order = await orderRepository.updateById(orderId, { status });
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    return order;
  }
}

module.exports = new AdminService();
