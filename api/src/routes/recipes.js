const { Router } = require('express');
const {getRecipes, getOneRecipe, deleteRecipe, postRecipe, allToDb} = require('../controllers/recipes.controllers')

const router = Router();

router.get('/', getRecipes);
router.get('/:id', getOneRecipe);
router.delete('/delete/:id', deleteRecipe);
router.post('/', postRecipe);
router.post('/create', allToDb);
module.exports = router;