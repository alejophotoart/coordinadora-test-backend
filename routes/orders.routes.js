const { Router } = require('express');
const { check } = require('express-validator');

// Validar JWT para la creacion de ordenes
const { validateJwt, isAdminRole, validateFields } = require('../middlewares');

const { isCityExists, checkTrailToOrdeCities } = require('../helpers/db-validators');

// Se llama el controlador de las rutas
const { createOrder,
        assignTrailToOrder,
        getOrderState, 
        changeStateOrder} = require('../controllers/orders.controller');

const { isPackageValid,
        senderValidation,
        recipientValidation } = require('../helpers/validate-orders');

const router = Router();

router.get('/:guide', [ validateJwt ], getOrderState) //Realizar seguimiento de orden

router.post('/', [ //Crear orden
    validateJwt,
    check('address', 'La direccion es obligatoria').not().isEmpty(),
    check('packages', "El paquete no esta siendo enviendo de la forma correcta").isArray().custom(p => isPackageValid(p)),
    check('sender', "El remitente no esta siendo enviado de forma correcta").isObject().custom(s => senderValidation(s)),
    check('recipient', "El destinatario no esta siendo enviado de forma correcta").isObject().custom(r => recipientValidation(r)),
    check('originCityId').custom(isCityExists),
    check('destinationCityId').custom(isCityExists),
    validateFields
    // check('estimatedDate', "Debes enviar una fecha estimada de llegada").not().isEmpty(),
], createOrder)

router.put('/assign-trail/:order', [ //Asignar ruta a la order
    validateJwt,
    isAdminRole,
    check('trailId', "La ruta es obligatoria").not().isEmpty(),
    check('carrierId', "El transportista es obligatorio").not().isEmpty(),
    check('trailId').custom((trailId, { req }) => checkTrailToOrdeCities(trailId, req)),
    validateFields
], assignTrailToOrder)

router.put('/change-state-order/:orderId', [ //Cambiar estado de la orden
    validateJwt,
    isAdminRole,
    validateFields
], changeStateOrder)

module.exports = router