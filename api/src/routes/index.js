const { Router } = require('express');
// Importar todos los routers;
const recipes = require('./recipes.js');
const typeDiets = require('./typesDiets.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes);
router.use('/types', typeDiets);

module.exports = router;
