const { Router } = require('express');
const { check } = require('express-validator');

// Se llama el middleware para las rutas
const { validateFields, 
        validateJwt, 
        isAdminRole } = require('../middlewares');

// Se llama el controlador de las rutas}
const { registerUser,
        users,
        destroyUser,
        updateUser } = require('../controllers/users.controller');

// Importar los db-validator para validar los datos recibidos
const { isEmailUsed } = require('../helpers/db-validators');

const router = Router();

router.get('/', users) //Obtener usuarios activos

router.post('/', [ //Crear o registrar usuario
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( isEmailUsed ),
    // check('roleId').custom( isRoleValid ),
    validateFields
], registerUser)

router.put('/:id', [ //Actualizar usuario
    validateJwt,
    validateFields
], updateUser);

router.delete('/:id', [ //Eliminar usuario
    validateJwt,
    isAdminRole,
    validateFields
], destroyUser)

module.exports = router