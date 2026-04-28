const cartRepository = require('../repositories/CartRepository');
const productRepository = require('../repositories/ProductRepository');

class CartService {
  async getCart(userId) {
    let cart = await cartRepository.findOne({ user: userId }, 'items.product');
    if (!cart) {
      cart = await cartRepository.create({ user: userId, items: [] });
      return cart;
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product !== null);

    if (cart.items.length !== initialLength) {
      await cart.save();
    }

    return cart;
  }

  async addItemToCart(userId, productId, quantity) {
    const product = await productRepository.findById(productId);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    if (product.stock < quantity) {
      const error = new Error('Insufficient stock');
      error.statusCode = 400;
      throw error;
    }

    let cart = await cartRepository.findOne({ user: userId });
    if (!cart) {
      cart = await cartRepository.create({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return await cart.populate('items.product');
  }

  async updateCartItem(userId, productId, quantity) {
    const cart = await cartRepository.findOne({ user: userId });
    if (!cart) {
      const error = new Error('Cart not found');
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = cart.items.findIndex(item => item.product && item.product.toString() === productId);
    if (itemIndex === -1) {
      const error = new Error('Item not found in cart');
      error.statusCode = 404;
      throw error;
    }

    const product = await productRepository.findById(productId);
    if (!product) {
      // If product is missing, remove it from cart and return updated cart
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return await cart.populate('items.product');
    }

    if (product.stock < quantity) {
      const error = new Error('Insufficient stock');
      error.statusCode = 400;
      throw error;
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return await cart.populate('items.product');
  }

  async removeItemFromCart(userId, productId) {
    const cart = await cartRepository.findOne({ user: userId });
    if (!cart) {
      const error = new Error('Cart not found');
      error.statusCode = 404;
      throw error;
    }

    cart.items = cart.items.filter(item => item.product && item.product.toString() !== productId);
    await cart.save();
    return await cart.populate('items.product');
  }
}

module.exports = new CartService();
