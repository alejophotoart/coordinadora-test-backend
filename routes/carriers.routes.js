const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const validateFields = require('../middlewares/validate-fields');

const { validateJwt } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-role');
const { createCarrier, carriersAvailables } = require('../controllers/carriers.controller');

// Se llama el controlador de las rutas

const router = Router();

router.get('/carriers-availables', carriersAvailables)

router.post('/', [
    validateJwt,
    isAdminRole,
    check('fullName', 'El nombre es obligatorio').not().isEmpty(),
    check('vehicle', "El vehiculo no esta siendo enviado de forma correcta").isObject(),
    validateFields
], createCarrier)

module.exports = router