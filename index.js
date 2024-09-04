
// traemos el archivo dotenv
require('dotenv').config();

//const usuarios = require('./controllers/usuarios')
//const cursos = require('./controllers/cursos')

const usuarioRoutes = require('./routes/usuario_routes');
const cursoRoutes = require('./routes/curso_routes');

const express = require('express');
const mongoose = require('mongoose');

// Importar la configuración de Swagger
const { swaggerUi, swaggerDocs } = require('./swagger/swagger');

// Obtener la cadena de conexión desde las variables de entorno
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;

// Conexión a la base de datos mongodb
mongoose.connect(connectionString)
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB...', err));

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// end points (recursos)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
    console.log('Usando la ruta http://localhost:3000');
});
