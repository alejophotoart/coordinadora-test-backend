const { request, response } = require("express");
const { Sender, Recipient, Package, Order, OrderItem } = require('../models');

const Chance = require('chance');
const chance = new Chance();

const { Op } = require("sequelize");

const createOrder = async(req = request, res = response) => {

    let { sender, recipient, packages, ...order } = req.body

    try {
        // Se Consulta primero si ese remitente y destinatario ya existen para no duplicarlos
        let [searchSender, searchRecipient] = await Promise.all([
            await Sender.findOne({ where: { [Op.or]: [ { documentNumber: sender.documentNumber }, { phone: sender.phone }]}}),
            await Recipient.findOne({ where: { [Op.or]: [ { documentNumber: recipient.documentNumber }, { phone: recipient.phone }]}})
        ])
    
        // Si no lo encuentra, lo crea ya que es un remitente nuevo
        if (!searchSender) {
            const { id, ...senderFiltered } = sender
            sender = await Sender.create(senderFiltered) 
        }
        
        // Si no lo encuentra, lo crea ya que es un remitente nuevo
        if (!searchRecipient) {
            const { id, ...recipientFiltered } = recipient
            recipient = await Recipient.create(recipientFiltered) 
        }
        
        // Preparar el registro de la orden
        const orderInfo = await Order.create({
            userId: req.user.id,
            senderId: !searchSender ? sender.id : searchSender.id,
            recipientId: !searchRecipient ? recipient.id : searchRecipient.id,
            priceDelivery: order.priceDelivery,
            estimatedDate: order.estimatedDate,
            originCityId: order.originCityId,
            destinationCityId: order.destinationCityId,
            address: order.address,
            addressDetail: order.addressDetail,
            guideNumber: chance.natural().toString()   // Preparar el numero de guia
        })

        // Preparar los paquetes
        const packagesIds = [];
        for (const package of packages) {
            const { id, ...packageFiltered } = package
            const newPackage = await Package.create(packageFiltered)
            packagesIds.push(newPackage.id);
        }
    
        // Preparar la tabla relacion OrderItems
        for (const id of packagesIds) {
            await OrderItem.create({
                orderId: orderInfo.id,
                packageId: id
            })
        }    
        
        return res.status(201).json({
            msg: "Orden creada exitosamente! ✅",
            guide: orderInfo.guideNumber
        })

    } catch (error) {
        console.error(error);
        throw new Error("Ocurrio un error al momento de registrar la orden");       
    }
}

module.exports = {
    createOrder
}