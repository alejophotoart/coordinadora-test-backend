const { request, response } = require('express')

const { User } = require('../models')

const users = async (req = request, res = response) => {
    
    const { limit = 5, since = 0 } = req.query
    
    // Ejecutar peticiones a DB de manera simultanea
    const [ total, users ] = await Promise.all([
        User.count(),
        User.findAll({
            offset: Number(since), // Desde que registro quiere que se muestra
            limit: Number(limit), // La cantidad que se va a mostrar desde el registro indicado
            order: [['createdAt', 'DESC']] // Ordenar por orden de creacion
        }) 
    ])

    res.json({
        total,
        users
    })
}

const register = async (req = request, res = response) => {
    
    try {

        // Agarramos solos los que deseamos ingresar y validar
        const { name, email, password, roleId } = req.body

        // Guardar en BD
        const user = await User.create({
            name,
            email,
            password,
            roleId
        });
        
        res.status(201).json({
            msg: "Usuario registrado exitosamente! ✅",
            user
        })
        
    } catch (error) {
        
        console.error(`Error al registrar usuario ${error}`);
        return res.status(500).json({
            msg: "Ocurrio un error - registro de usuario"
        })
    }
    
}

module.exports = {
    register,
    users
}