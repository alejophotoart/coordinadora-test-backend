const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const { validateFields, validateJwt } = require('../middlewares');

// Se llama el controlador de las rutas
const { login, renovateJwt } = require('../controllers/auth.controller');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)

router.get('/', validateJwt, renovateJwt)

module.exports = router