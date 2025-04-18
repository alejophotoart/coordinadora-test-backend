const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const { User } = require('../models');

const validateJwt = async(req = request, res = response, next) => {
    
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "token en la peticion vacio"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEYJWT)

        const userAuth = await User.findByPk( uid )

        if ( !userAuth ) {
            return res.status(401).json({
                msg: "Token no valido - usuario no encontrado"
            })
        }
        
        req.user = userAuth
        next()

    } catch (error) {

        console.log(error);
        // throw new Error("Token no valido");
        res.status(401).json({
            msg: "Token no valido"
        })
        
    }
}

module.exports = {
    validateJwt
}