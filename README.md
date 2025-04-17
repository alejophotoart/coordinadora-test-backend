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
2.  Descargar el codigo o hacer `git clone ${link del repositorio}`
3.  Ir a la carpeta del proyecto y en consola ejecutar la creacion de las dependencias `npm instal o npm i`
4.  Luego ejecutar en consola la creacion de las tablas: `node scripts/sync-tables.js`
5.  **IMPORTANTE** ejecutar el comando para correr los seeder de roles: `node seeders/seedRoles.js`
6.  Luego para crear las tabla y sus seeders, ejecutar `nodemon app`