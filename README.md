# Prueba Ingreso Coordinadora Backend (RestServer)

## Autor
**Jose Alejandro Calderon Rico**
📧 alejandronba98@gmail.com  
📱 +57 315 470 9447

Hola a todos, Esta es la prueba backend. Dejare un listado descriptivo donde indique lo que se utilizo para realizarlo

- Desarrollo: Node.js
- Framework: Express
- Lenguaje: Javascript
- Documentacion: Swagger
- Control de Versiones: GIT
- DB: Mysql/Sequelize


# Herramientas:
Para continuar con la pruebas del backend, hay ciertas herramientas a tener en cuenta que deberas tener instaladas

* Git: para poder clonar el repo
* node.js (npm)


# Acontinuacion dejare los comandos iniciales para que esta Api funcione

1.  Ir al repositorio en GitHub: *https://github.com/alejophotoart/coordinadora-test-backend.git*
2.  Descargar el codigo o hacer:
 ```bash 
 git clone ${link del repositorio}
 ```
3.  Ir a la carpeta del proyecto y en consola ejecutar la creacion de las dependencias: 
```bash 
npm install o npm i
```
4.  Luego ejecutar en consola la creacion de las tablas: 
```bash 
node scripts/sync-tables.js
```

5.  **IMPORTANTE** ejecutar los siguientes comandas para llenar con datos predeterminados las tablas:
```bash 
node seeders/cities.js
```
```bash 
node seeders/countries.js
```
```bash
node seeders/document-types.js
```
```bash 
node seeders/order-status.js
```
```bash 
node seeders/roles.js
```
```bash 
node seeders/states.js
```
    
6.  Luego de crear las tabla y sus seeders, ejecutar:
```bash 
nodemon app
```

# Adicionales.

Hola como habia dicho, en caso de que no les funcione la api con Swagger.
Por aca dejo un link propio de postman donde podran probarla y miran detalladamente los endpoint
Link documentacion 2: **https://documenter.getpostman.com/view/18095859/2sB2iwEtpW**

Muchas gracias,
Espero pueda volver a saber muy pronto de ustedes y gracias por tomarse el tiempo de leer hasta aca

Saludos!