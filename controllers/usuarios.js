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
/*ruta.get('/',(req,res)=>{
    res.json('respuesta a peticion GET de USUARIOS funcionando correctamente...')
}); */

//Ruta Post

ruta.post('/', async (req, res) => {
    let body = req.body;

    const { error, value } = schema.validate({
        nombre: body.nombre,
        email: body.email,
        password: body.password
    });

    if (!error) {
        try {
            let usuario = await crearUsuario(body); 
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

// Funcion asincronica para actualizar un usuario

async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre: body.nombre,
            password: body.password
        } 
    }, {new: true});
    return usuario;
}

// Endpoint de tipo PUT para actualizar los datos del usuario

ruta.put('/:email', async (req, res) => {

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

// Funcion asincronica para actualizar un usuario

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        } 
    }, {new: true});
    return usuario;
}

// Endpoint de tipo DELETE para el recurso USUARIOS

ruta.delete('/:email', (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    });
});

// Funcion asincrona para listar todos los usuarios activos 

async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}


//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios

ruta.get('/', (req, res)=>{
    let resultado = listarUsuariosActivos();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(err=>{
        res.status(400).json({
            message:'Error al listar los usuarios activos',
            error:err.message
        })
    })
})



module.exports = ruta;

