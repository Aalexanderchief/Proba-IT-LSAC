const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
