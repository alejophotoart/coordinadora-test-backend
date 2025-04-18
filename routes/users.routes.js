const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const validateFields = require('../middlewares/validate-fields');

// Se llama el controlador de las rutas}
const { register, users } = require('../controllers/users.controller');

// Importar los db-validator para validar los datos recibidos
const { isRoleValid, isEmailUsed } = require('../helpers/db-validators');

const router = Router();

router.get('/', users)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( isEmailUsed ),
    check('roleId').custom( isRoleValid ),
    validateFields
], register)

module.exports = router