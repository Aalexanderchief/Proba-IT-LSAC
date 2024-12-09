const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  image_url: { type: String, default: '' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
