require('dotenv').config();
const sequelize = require('../database/sequelize');
const { DocumentType } = require('../models');

const seedDocumentTypes = async() => {
    
    try {
        await sequelize.authenticate();

        const documentTypes = require('../data/document-types.json');

        for (const dt of documentTypes) {
            const { name } = dt
            await DocumentType.findOrCreate({ where: { name } });
        }

        console.log('Tipos de documento insertados correctamente');
        
    } catch (error) {

        console.error('Error al insertar roles:', error);
        process.exit(1);
    } finally {
        
        await sequelize.close();
        console.log('Conexión terminada.');
        process.exit();
    }
}

seedDocumentTypes();