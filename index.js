
// traemos el archivo dotenv
require('dotenv').config();

//const usuarios = require('./controllers/usuarios')
//const cursos = require('./controllers/cursos')

const usuarioRoutes = require('./routes/usuario_routes');
const cursoRoutes = require('./routes/curso_routes');

const express = require('express');
const mongoose = require('mongoose');
// Importa el paquete cors
const cors = require('cors'); 

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

// Configuración básica de CORS (permite todas las solicitudes de cualquier origen)
app.use(cors());

// Opcional: configuración avanzada de CORS
/* 
const corsOptions = {
  origin: '*', // Reemplaza con el dominio que quieres permitir
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions)); // Habilita cors con las opciones especificas
//app.use('*', cors(corsOptions)) // habilida CORDS
*/

// Configuración de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// end points (recursos)
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api REST Ok, y ejecutándose...');
    console.log(`Usando la ruta http://localhost:${port}`);
});
