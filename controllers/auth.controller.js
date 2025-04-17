const bcrypt = require('bcryptjs')
const { request, response } = require('express')

const login = async( req = request, res = response ) => {
    
    console.log(req.body);
}

module.exports = {
    login
}