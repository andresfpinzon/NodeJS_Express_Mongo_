const express = require('express');
const ruta = express.Router();
const logic = require('../logic/usuario_logic')
const schema  = require('../validation/usuario_validation');

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
            let usuario = await logic.crearUsuario(body); 
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


// Endpoint de tipo PUT para actualizar los datos del usuario

ruta.put('/:email', async (req, res) => {

    const { error, value } = schema.validate({nombre: req.body.nombre});

    if (!error) {
        let resultado = logic.actualizarUsuario(req.params.email, req.body);
        resultado.then(valor => {
            res.json({
                valor
            })
        }).catch(err => {
            res.status(400).json({
                error: err.message
            })
        })

    } else {
        res.status(400).json({
            error
        })

    }
});

// Endpoint de tipo DELETE para el recurso USUARIOS

ruta.delete('/:email', (req, res) => {
    let resultado = logic.desactivarUsuario(req.params.email);
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

//Endpoint de tipo GET para el recurso usuarios. Lista todos los usuarios

ruta.get('/', (req, res)=>{
    let resultado = logic.listarUsuariosActivos();
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

