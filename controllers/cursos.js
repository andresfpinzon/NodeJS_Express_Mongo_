const express = require('express');
const ruta = express.Router();
const logic = require('../logic/curso_logic');
const schema = require('../validation/curso_validation');

/*
ruta.get('/',(req,res)=>{
    res.json('respuesta a peticion GET de CURSOS funcionando correctamente...')
});
*/

//Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', async (req, res)=>{
    let body = req.body;

    const { error, value } = schema.validate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });

    if(!error){
        try{
            let curso = await logic.crearCurso(req.body);
            res.json({
                valor: curso
            });
        }catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        })
    }
});

//Endpoint de tipos PUT para actualizar los cursos

ruta.put('/:id', (req, res)=>{

    const { error, value } = schema.validate({
        titulo: req.body.titulo, 
        descripcion: req.body.descripcion,
        alumnos: req.body.alumnos,
        calificacion: req.body.calificacion
    });
    
    if (!error){
        let resultado = logic.actualizarCurso(req.params.id, req.body);
        resultado.then(curso => {
            res.json(curso)
        }).catch(err=>{
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

//Endpoindt de tipo DELETE para desactivar cursos

ruta.delete('/:id', (req, res)=>{
    let resultado = logic.desactivarCurso(req.params.id);
    resultado.then(curso =>{
        res.json(curso);
    }).catch(err =>{
        res.status(400).json(ert);
    })
})

//Endpoint tipo GET paral listar los cursos activos

ruta.get('/', (req, res)=>{
    let resultado = logic.listarCursosActivos();
    resultado.then(cursos =>{
        res.json(cursos);
    }).catch(err=>{
        res.status(400).json(err);
    })
})

module.exports = ruta;
