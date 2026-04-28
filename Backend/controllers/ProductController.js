const productService = require('../services/ProductService');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

const adminService = require('../services/AdminService');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await adminService.getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
