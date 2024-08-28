const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/',(req,res)=>{
    res.json('respuesta a peticion GET de USUARIOS funcionando correctamente...')
});

module.exports = ruta;
