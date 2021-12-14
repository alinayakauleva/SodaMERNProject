const RecipeController = require('../controllers/recipe.controller');

const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/recipes', RecipeController.findAllRecipes);
    app.post('/api/recipes', authenticate, RecipeController.createNewRecipe);
    app.get('/api/recipes/:id', RecipeController.findOneRecipe);
    app.put('/api/recipes/:id', RecipeController.updateRecipe);
    app.delete('/api/recipes/:id', RecipeController.deleteRecipe);
    app.get('/api/user/recipes/:userId', RecipeController.findAllRecipesByUser);
    app.get('/api/recipes/find/:name', RecipeController.findRecipesByName);
    app.get('/api/user/recipes/favorites/:id', RecipeController.findFavoritesByUser);
}