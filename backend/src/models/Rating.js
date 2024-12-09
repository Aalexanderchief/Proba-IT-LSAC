const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min:1, max:5, required: true }
});

RatingSchema.index({ recipe_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Rating', RatingSchema);
