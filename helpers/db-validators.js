const { response } = require('express')
const { Role, User } = require('../models')

const isEmailUsed = async (email) => {
    
    const emailExists = await User.findOne({ where: { email } })
    if (emailExists) {
        throw new Error(`El correo ${ email } ya se encuentra en uso`)
    } 
}

const isRoleValid = async( roleId = '' ) => {

    const roleExists = await Role.findByPk( roleId )
    if (!roleExists) {
        throw new Error(`El rol ${ roleId } no existe en nuestros registros`)
    }
}

module.exports = {
    isEmailUsed,
    isRoleValid
}