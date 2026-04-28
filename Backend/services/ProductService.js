const productRepository = require('../repositories/ProductRepository');

class ProductService {
  async getAllProducts(filter = {}) {
    const { category, search } = filter;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    return await productRepository.findAll(query, {}, 'category');
  }

  async getProductById(id) {
    const product = await productRepository.findById(id, 'category');
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }
}

module.exports = new ProductService();
