const jwt = require('jsonwebtoken');

const generateJwt = ( uid ) => {

    return new Promise((resolve, reject) => {

        const payload = { uid } 

        jwt.sign(payload, process.env.SECRETKEYJWT, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar token")
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJwt
}