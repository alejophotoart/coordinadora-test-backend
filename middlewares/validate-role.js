const { response, request } = require("express")

const isAdminRole = (req = request, res = response, next) => {
    
    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        })    
    }

    const { roleId, name } = req.user

    if (roleId !== 1) {
        return res.status(401).json({
            msg: `${ name } no esta autorizado para hacer esta funcion`
        })
    }

    next()
}

module.exports = {
    isAdminRole
}