const orderService = require('../services/OrderService');

exports.checkout = async (req, res, next) => {
  try {
    const order = await orderService.checkout(req.user.id);
    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrderDetails(req.params.id, req.user.id);
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};
