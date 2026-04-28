const cartService = require('../services/CartService');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

exports.addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(req.user.id, productId, quantity);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await cartService.updateCartItem(req.user.id, req.params.productId, quantity);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  try {
    const cart = await cartService.removeItemFromCart(req.user.id, req.params.productId);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
