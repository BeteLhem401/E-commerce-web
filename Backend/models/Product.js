const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    min: [0, 'Stock cannot be negative']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category']
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
