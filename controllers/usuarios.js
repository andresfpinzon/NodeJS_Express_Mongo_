const express = require('express');
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

// import de joi

const Joi = require('joi'); 

// Validaciones para el objeto usuario

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/), 
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
});

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password
    });
    return await usuario.save();
}

// ruta Get
ruta.get('/',(req,res)=>{
    res.json('respuesta a peticion GET de USUARIOS funcionando correctamente...')
});

//Ruta Post

ruta.post('/', async (req, res) => {
    let body = req.body;

    // Validar los campos 'nombre', 'email' y 'password' en el cuerpo de la solicitud
    const { error, value } = schema.validate({
        nombre: body.nombre,
        email: body.email,
        password: body.password
    });

    if (!error) {
        try {
            let usuario = await crearUsuario(body); // Esperar la creación del usuario
            res.json({
                valor: usuario
            });
        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});

// ruta put

async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre: body.nombre,
            password: body.password
        } 
    }, {new: true});
    return usuario;
}

ruta.put('/:email', async (req, res) => {

    // Validar los campos 'nombre', 'email' y 'password' en el cuerpo de la solicitud
    const { error, value } = schema.validate({nombre: req.body.nombre});

    if (!error) {
        let resultado = actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        })

    } else {
        res.status(400).json({
            error
        })

    }
});

module.exports = ruta;

