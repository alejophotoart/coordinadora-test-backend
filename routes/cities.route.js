const { Router } = require('express');

// Se llama el controlador de las rutas
const { cities, searchCity } = require('../controllers/cities.controller');

const router = Router();

router.get('/', cities)

router.get('/:city', searchCity)


module.exports = router