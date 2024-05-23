const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['smartphone', 'desktop'],
  },
  quantity: { type: Number, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now },
});

productSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  this._update.updated_at = Date.now();
  next();
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
