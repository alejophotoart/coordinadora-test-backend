require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Documentacion Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json')

const dbConnection = require('../database/config.db');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        
        this.routePaths = {
            auth:     '/api/auth',
            carriers: '/api/carriers',
            cities:   '/api/cities',
            orders:   '/api/orders',
            trails:   '/api/trails',
            users:    '/api/users',
        }
        
        // Conexion a la DB
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Rutas de mi API
        this.routes()

        this.swagger()
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
        this.app.use(this.routePaths.auth,      require('../routes/auth.routes'));
        this.app.use(this.routePaths.carriers,  require('../routes/carriers.routes'));
        this.app.use(this.routePaths.cities,    require('../routes/cities.route'));
        this.app.use(this.routePaths.orders,    require('../routes/orders.routes'));
        this.app.use(this.routePaths.trails,    require('../routes/trails.routes'));
        this.app.use(this.routePaths.users,     require('../routes/users.routes'));
    }

    swagger() {
        this.app.use('/api-docs', swaggerUi.serve);
        this.app.get('/api-docs', swaggerUi.setup( swaggerDocument ))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running in port", this.port);
        });
    }
}

module.exports = Server