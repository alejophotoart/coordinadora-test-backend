const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const { validateFields, validateJwt, isAdminRole } = require('../middlewares');

const { isCityExists, isCarriersExists } = require('../helpers/db-validators');

const { trails, createTrail, assignCarrierToTrail, deleteCarrierToTrail } = require('../controllers/trails.controller');

// Se llama el controlador de las rutas

const router = Router();

router.get('/', trails)

router.post('/', [ //Crear rutas
    validateJwt,
    isAdminRole,
    check('originCityId').custom(isCityExists),
    check('destinationCityId').custom(isCityExists),
    validateFields
], createTrail)

router.post('/assing-carrier/:trailId', [ //Asignar transportista a la ruta
    validateJwt,
    isAdminRole,
    check('carriers', 'Los transportista no estan siendo enviados de forma correcta').isArray(),
    check('carriers').custom((carriers, { req } ) => isCarriersExists( carriers, req )),
    validateFields
], assignCarrierToTrail)

router.delete('/carrier-trail/:trailId', [ //Eliminar transportista de ruta
    validateJwt,
    isAdminRole,
    check('carriers', 'Los transportista no estan siendo enviados de forma correcta').isArray(),
], deleteCarrierToTrail)

module.exports = router