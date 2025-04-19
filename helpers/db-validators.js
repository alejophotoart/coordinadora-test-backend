const { request } = require('express')
const { Role, User, City, Carrier, Trail, Order, TrailCarrier } = require('../models')

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

const isCarriersExists = async (carriers, req = request) => {

    const trailId = req.params.trailId
    
    for (const carrierId of carriers) {
        const carrierExists = await Carrier.findByPk(carrierId)
        if (!carrierExists) {
            throw new Error(`Un transportista no existe en nuestros registros`)
        
        }
        
        const toAssign = await TrailCarrier.findAll({ where: { trailId, carrierId } })
        if ( !toAssign ) {
            if (!carrierExists.available) {
                throw new Error(`El transportista ${ carrierExists.fullName } no esta disponible`)
            }
        }
    }
}

// Se valida que las ciudades de la ruta corresponda con el origen y el destino de la orden
const checkTrailToOrdeCities = async( trailId, req = request ) => {

    const orderId = req.params.order
    const { carrierId } = req.body

    const trail = await Trail.findByPk(trailId)
    const order = await Order.findByPk(orderId)
    
    // Comparar ciudad de origin
    if (trail.originCityId !== order.originCityId) {
        throw new Error(`Los origenes de la ruta y la orden no coinciden`)
    }
    
    // Comparar los destinos
    if (trail.destinationCityId !== order.destinationCityId) {
        throw new Error(`Los destinos de la ruta y la orden no coinciden`)
    }

    // Saber si el carrier enviado tiene esa ruta asignada
    const exists = await TrailCarrier.findOne({
        where: {
            trailId,
            carrierId,
        }
    });

    if (!exists) {
        throw new Error(`Lo sentimos ese transportista no tiene asignada esa ruta`)
    }
}

module.exports = {
    isEmailUsed,
    isRoleValid,
    isCityExists,
    isCarriersExists,
    checkTrailToOrdeCities
}