const Recipe = require('../models/Recipe');
const Rating = require('../models/Rating');

exports.getTopRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ rating: -1 }).limit(3);
    return res.status(200).json(recipes);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    return res.status(200).json(recipes);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { name, description, image_url } = req.body;
    if(!name) return res.status(400).json({ message: 'Name is required' });
    const recipe = new Recipe({
      user_id: req.userId,
      name,
      description: description || '',
      image_url: image_url || ''
    });
    await recipe.save();
    return res.status(201).json({ message: 'Recipe added successfully' });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.rateRecipe = async (req, res) => {
  try {
    const { recipe_id, rating } = req.body;
    if(!recipe_id || !rating) return res.status(400).json({ message: 'Missing fields' });
    if(rating < 1 || rating > 5) return res.status(400).json({ message: 'Invalid rating' });

    let recipe = await Recipe.findById(recipe_id);
    if(!recipe) return res.status(404).json({ message: 'Recipe not found' });

    let userRating = await Rating.findOne({ recipe_id, user_id: req.userId });
    if(userRating) {
      userRating.rating = rating;
      await userRating.save();
    } else {
      userRating = new Rating({ recipe_id, user_id: req.userId, rating });
      await userRating.save();
    }

    // Recalculează rating-ul mediu
    const ratings = await Rating.find({ recipe_id });
    const avg = ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length;
    recipe.rating = avg;
    await recipe.save();

    return res.status(200).json({ message: 'Rating submitted', rating: avg });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteOwnRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if(!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if(recipe.user_id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not allowed' });
    }
    await Recipe.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Recipe deleted' });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
