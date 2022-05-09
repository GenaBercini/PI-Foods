const { Router } = require('express');
const router = Router();
const {getTypes} = require('../controllers/types.controllers')

router.get('/', getTypes);

module.exports = router;