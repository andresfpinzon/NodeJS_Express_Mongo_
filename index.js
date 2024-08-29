
// traemos el archivo dotenv
require('dotenv').config();

const usuarios = require('./controllers/usuarios')
const cursos = require('./controllers/cursos')

const express = require('express');
const mongoose = require('mongoose');

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

// end points (recursos)
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
});
