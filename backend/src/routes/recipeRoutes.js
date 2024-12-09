const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getTopRecipes, getAllRecipes, addRecipe, rateRecipe, deleteOwnRecipe } = require('../controllers/recipeController');

router.get('/top', getTopRecipes);
router.get('/', getAllRecipes);
router.post('/', auth, addRecipe);
router.post('/rate', auth, rateRecipe);
router.delete('/:id', auth, deleteOwnRecipe);

module.exports = router;
