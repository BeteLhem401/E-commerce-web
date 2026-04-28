const adminService = require('../services/AdminService');

// Product Management
exports.addProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.image = req.file.filename;
    }
    const product = await adminService.addProduct(productData);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await adminService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await adminService.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Category Management
exports.addCategory = async (req, res, next) => {
  try {
    const category = await adminService.addCategory(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

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

// User Management
exports.getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Order Management
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await adminService.getAllOrders();
    res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await adminService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
