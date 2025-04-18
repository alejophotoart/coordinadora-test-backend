const { Role, User, City, Carrier } = require('../models')

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

const isCityExists = async( cityId = '' ) => {

    const cityExists = await City.findByPk( cityId )
    if (!cityExists) {
        throw new Error(`La ciudad ${ cityId } no existe en nuestros registros`)
    }
}

const isCarriersExists = async (carriers) => {
    
    for (const c of carriers) {
        const carrierExists = await Carrier.findByPk(c)
        if (!carrierExists) {
            throw new Error(`Un transportista no existe en nuestros registros`)
            
        } else if (!carrierExists.available) {
            throw new Error(`El transportista ${ carrierExists.fullName } no esta disponible`)
        }
    }
}

module.exports = {
    isEmailUsed,
    isRoleValid,
    isCityExists,
    isCarriersExists
}