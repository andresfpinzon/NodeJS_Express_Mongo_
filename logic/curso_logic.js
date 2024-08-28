const Curso = require('../models/curso_model');
const Joi = require('joi'); 

// Validaciones para el objeto curso

const schema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/), 
    descripcion: Joi.string()
        .min(3)
        .max(260)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/),
    alumnos: Joi.number() 
        .integer()
        .min(1)
        .max(100)
        .required(),
    calificacion: Joi.number()
        .precision(1)
        .min(1)
        .max(10)
        .required()   
});

// Función asíncrona para crear un objeto de tipo usuario

async function crearCurso(body){
    let curso = new Curso({
        titulo  :body.titulo,
        descripcion : body.descripcion,
        alumnos     : body.alumnos,
        calificacion : body.calificacion
    })
    return await curso.save();
}

//Funcion asincrona para actualizar cursos

async function actualizarCurso(id, body){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        }
    },{new:true});
return curso;
}

//Funcion asincrona para Desacticar cursos

async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
    },{new:true});
return curso;
}

//Funcion asincrona para listar los cursos activos

async function listarCursosActivos() {
    let cursos = await Curso.find({"estado": true});
    return cursos;
    
}

module.exports={
    schema,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}