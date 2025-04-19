const { request, response } = require("express");
const { Trail, TrailCarrier, Carrier } = require("../models");

const createTrail = async(req = request, res = response) => {

    const { originCityId, destinationCityId, nameTrail } = req.body

    try {

        const routeExists = await Trail.findOne({ 
            where: {
                originCityId: originCityId,
                destinationCityId: destinationCityId
            }
        })
        
        if (routeExists) {
            return res.status(400).json({
                msg: "Esta ruta ya existe"
            })
        }
        
        const trail = Trail.build({
            nameTrail,
            originCityId,
            destinationCityId
        })

        await trail.save()

        return res.status(201).json({
            msg: "Ruta creada exitosamente"
        })

    } catch (error) {
        console.error(error);
        throw new Error("Ocurrio un error al momento de registrar");   
    }
}

const assignCarrierToTrail = async( req = request, res = response ) => {
    
    const { carriers } = req.body
    const { trailId } = req.params

    for (const carrierId of carriers) {

        const carrier = await Carrier.findByPk(carrierId)
        
        await TrailCarrier.create({
            trailId,
            carrierId
        })

        await carrier.update({
            available: false
        })
    }

    res.status(201).json({
        msg: "Transportista asignados correctarmente a la ruta"
    })
}

const deleteCarrierToTrail = async( req = request, res = response ) => {
    
    const { carriers } = req.body
    const { trailId } = req.params

    for (const carrierId of carriers) {

        const carrier = await Carrier.findByPk(carrierId)
        
        await TrailCarrier.destroy({
            where: {
                trailId,
                carrierId
            }
        })

        await carrier.update({
            available: true
        })
    }

    res.status(201).json({
        msg: "Sacaste al transportista de esta ruta"
    })
}

module.exports = {
    createTrail,
    assignCarrierToTrail,
    deleteCarrierToTrail
}