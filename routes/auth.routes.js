const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const validateFields = require('../middlewares/validate-fields');

// Se llama el controlador de las rutas
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)

module.exports = router