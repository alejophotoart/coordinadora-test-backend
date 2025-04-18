const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const validateFields = require('../middlewares/validate-fields');

const { isCityExists, isCarriersExists } = require('../helpers/db-validators');
const { validateJwt } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-role');
const { createTrail, assignCarrierToTrail } = require('../controllers/trails.controller');

// Se llama el controlador de las rutas

const router = Router();

router.post('/', [
    validateJwt,
    isAdminRole,
    check('originCityId').custom(isCityExists),
    check('destinationCityId').custom(isCityExists),
    validateFields
], createTrail)

router.post('/assing-carrier/:id', [
    validateJwt,
    isAdminRole,
    check('carriers', 'Los transportista no estan siendo enviados de forma correcta').isArray(),
    check('carriers').custom(isCarriersExists),
    validateFields
], assignCarrierToTrail)

module.exports = router