require('dotenv').config();

const express = require('express');
const cors = require('cors');

const dbConnection = require('../database/config.db');
const sequelize = require('../database/sequelize');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        this.routePaths = {
            auth: '/api/auth',
        }
        
        // Conexion a la DB
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi API
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() )
    }

    routes() {
        this.app.use(this.routePaths.auth, require('../routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running in port", this.port);
        });
    }
}

module.exports = Server