const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/',(req,res)=>{
    res.json('respuesta a peticion GET de CURSOS funcionando correctamente...')
});

module.exports = ruta;
