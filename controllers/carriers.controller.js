const { request, response } = require("express");
const { Carrier, Vehicle } = require("../models");

const createCarrier = async(req = request, res = response) => {

    const { vehicle,...carrier } = req.body

    try {

        if (Object.keys(vehicle).length <= 0) { 
            res.status(400).json({
                msg: "La informacion del vehiculo no debe llegar vacia"
            })
        }
    
        // Validacion de campos vacios
        const hasEmptyValues = Object.values(vehicle).some(value => {
            return value === '' || value === null || value === undefined;
        });
    
        if (hasEmptyValues) {
            res.status(400).json({
                msg: "La informacion del vehiculo no debe llegar vacia"
            })
        }

        const vehicleCreated = await Vehicle.create(vehicle)
        
        await Carrier.create({
            fullName: carrier.fullName,
            available: carrier.available,
            vehicleId: vehicleCreated.id
        })

        return res.status(201).json({
            msg: "Transportiste y vehiculo creado exitosamente"
        })

    } catch (error) {
        console.error(error);
        throw new Error("Ocurrio un error al momento de registrar"); 
    }
}

const carriersAvailables = async( req = request, res = response ) => {
    
    const carriersAva = await Carrier.findAll({
        where: { available: true },
        order: [['createdAt', 'DESC']]
    })

    return res.status(200).json( carriersAva )
}

module.exports = {
    createCarrier,
    carriersAvailables
}