const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: {
    type: String,
    required: true,
    enum: ['pria', 'wanita'],
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this._update.updated_at = Date.now();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
