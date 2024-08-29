const Curso = require('../models/curso_model');

// Función asíncrona para crear un objeto de tipo usuario

async function crearCurso(body){

    // verificamos si el curso ya existe en nuestra base de datos
    let cursoExistente = await Curso.findOne({ titulo: body.titulo });
    if (cursoExistente) {
        throw new Error('Un Curso registrado con ese nombre ya existe.');
    }

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

    let cursoExistente = await Curso.findOne({ titulo: body.titulo });
    if (cursoExistente && cursoExistente._id.toString() !== id) {
        throw new Error('Un curso con ese nombre ya existe.');
    }
    
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
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}