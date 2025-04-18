const { Sender, Recipient } = require("../models");

const isPackageValid = (packages = []) => {

    if (packages.length <= 0) {
        throw new Error(`El paquete/producto no debe llegar vacio`);
    }

    for (const [index, pkg] of packages.entries()) {
        for (const key in pkg) {
            if (key === 'description') continue;
            if (
                pkg[key] === undefined ||
                pkg[key] === null ||
                pkg[key] === '' ||
                (typeof pkg[key] === 'string' && pkg[key].trim() === '')
            ) {
                throw new Error(`El campo ${key} está vacío en el paquete #${index + 1}`);
            }
        }
    }
    return true
}

const senderValidation = async (sender = {}) => {
    
    const { ok, msg } = await isSenderAndRecipientValid( sender )

    if (!ok) {
        throw new Error(msg);
    }

    // const phoneExists = await Sender.findOne({
    //     where: { phone: sender.phone }
    // })

    // if (phoneExists) {
    //     throw new Error(`El numero de telefono ${ sender.phone } ya existe`);
    // }

    return true
}

const recipientValidation = async (recipient = {}) => {
    
    const { ok, msg } = await isSenderAndRecipientValid(recipient)
    
    // console.log("result", result);

    if (!ok) {
        throw new Error( msg );
    }

    // const dataExists = await Recipient.findOne({
    //     where: { phone: recipient.phone }
    // })

    // if (dataExists) {
    //     throw new Error(`El numero de telefono ${ recipient.phone } ya existe`);
    // }

    return true
}

const isSenderAndRecipientValid = (obj = {}) => {
    
    return new Promise((resolve, reject) => {
        
        // Validacion que el sender tenga informacion
        if (Object.keys(obj).length <= 0) { 
            resolve({
                ok: false,
                msg: `El remitente ò destino no debe llegar vacio`
            })
        }
    
        // Validacion de campos vacios
        const hasEmptyValues = Object.values(obj).some(value => {
            return value === '' || value === null || value === undefined;
        });
    
        if (hasEmptyValues) {
            resolve({
                ok: false,
                msg: `El remitente ò destino no debe llegar vacio`
            })
        }

        if (obj.documentNumber.length > 50) {
            resolve({
                ok: false,
                msg: "El numero de documento es demasiado largo"
            })
        }
    
        if (obj.phone.length > 20) {
            resolve({
                ok: false,
                msg: "El numero de telefono es demasiado largo"
            })
        }
    
        resolve({
            ok: true,
            msg : "Data not empty"
        })
    })

}


module.exports = {
    isPackageValid,
    senderValidation,
    recipientValidation,
}