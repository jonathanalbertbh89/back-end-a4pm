const express = require('express');

const routes = express();

const categories = require('../controllers/categoriesController/CategoriesController')
const Categories = new categories()

const recipe = require('../controllers/RecipesController/RecipeController')
const Recipe = new recipe()

const authetication = require('../controllers/login/Authentication')
const Authentication = new authetication()

routes.get('/categories', Categories.index)

routes.post('/recipe/', Recipe.index)
routes.post('/registerrecipe', Recipe.registerRecipe)
routes.put('/editrecipe', Recipe.editRecipe)

routes.post('/userlogin', Authentication.Login)
routes.post('/userregister',Authentication.Register)

module.exports = routes