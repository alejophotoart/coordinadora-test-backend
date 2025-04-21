const { request, response } = require('express')

const { User } = require('../models')
const { generateJwt } = require('../helpers/generate-jwt')
const { where } = require('sequelize')

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

    res.status(200).json({
        total,
        users
    })
}

const registerUser = async (req = request, res = response) => {
    
    try {
        // Agarramos solos los que deseamos ingresar y validar
        const { name, email, password, roleId } = req.body

        // Guardar en BD
        const user = User.build({
            name,
            email,
            password
        });

        // Validacion de RoleId
        if (roleId) {
            user.roleId = roleId
        }

        await user.save()

        // Generar JWT
        const token = await generateJwt( user.id )
        
        res.status(201).json({
            msg: "Usuario registrado exitosamente! ✅",
            token
        })
        
    } catch (error) {
        
        console.error(`Error al registrar usuario ${error}`);
        return res.status(500).json({
            msg: "Ocurrio un error - registro de usuario"
        })
    }
    
}

const updateUser = async(req = request, res = response) => {
    
    const { id } = req.params

    const { name, password, roleId } = req.body

    const user = await User.findByPk(id)
    
    if ( !user ) {
        return res.status(400).json({
            msg: "Al parecer no puedes actualizar tu informacion"
        })    
    }

    await user.update({
        name,
        password,
        roleId
    })
        
    res.status(201).json({
        msg: "Actualizaste tu informacion"
    })
}

const destroyUser = async (req = request, res = response) => {
    
    const { id } = req.params

    try {

        const user = await User.findByPk( id )

        if ( !user ) {
            return res.status(404).json({
                msg: "Usuario no encontrado para eliminar"
            })
        }

        if ( user.roleId === 1 ) {
            return res.status(401).json({
                msg: "No puedes eliminar administradores",
            })
        }

        if ( id === req.user.id ) {
            return res.status(401).json({
                msg: "No puedes eliminarte a ti mismo"
            })
        }

        await User.destroy({ where: { id } })

        return res.status(200).json({
            msg: `Eliminaste el usuario ${ user.name }`
        })
        
    } catch (error) {
        console.error(error);
        throw new Error("Error eliminando usuarios");
        
    }
}

module.exports = {
    users,
    registerUser,
    updateUser,
    destroyUser,
}