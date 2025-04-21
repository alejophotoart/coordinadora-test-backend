const { request, response } = require('express')

const { generateJwt } = require('../helpers/generate-jwt');
const { User } = require('../models')

const login = async( req = request, res = response ) => {
    
    const { email, password } = req.body

    try {

        // Verificar si el email existe
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({
                msg: "Correo electronico / Contraseña no son correctos - email"
            })
        }

        // Verificar la contraseña
        const passwordSuccess = user.authenticate(password);
        if (!passwordSuccess) {
            return res.status(400).json({
                msg: "Correo electronico / Contraseña no son correctos - pass"
            })
        }
        
        // Generar JWT
        const token = await generateJwt( user.id )

        res.json({
            user,
            token
        })
        
    } catch (error) {

        console.log(error);
        throw new Error("Algo salio mal");        
    }
}

const renovateJwt = async (req = request, res = response) => {
    
    const { user } = req

    // Generar JWT
    const token = await generateJwt(user.id)
    
    return res.status(200).json({
        user,
        token
    })
}

module.exports = {
    login,
    renovateJwt
}