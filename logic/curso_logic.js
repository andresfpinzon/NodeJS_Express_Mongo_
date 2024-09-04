const Curso = require('../models/curso_model');
const Usuario = require('../models/usuario_model');

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
        estado: body.estado,
        imagen: body.imagen,
        alumnos     : body.alumnos,
        calificacion : body.calificacion
    })
    return await curso.save();
}

// Funcion asincrona para actualizar cursos
async function actualizarCurso(id, body){

    let cursoExistente = await Curso.findOne({ titulo: body.titulo });
    if (cursoExistente && cursoExistente._id.toString() !== id) {
        throw new Error('Un curso con ese nombre ya existe.');
    }
    
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            titulo: body.titulo,
            descripcion: body.descripcion,
            estado: body.estado,
            imagen: body.imagen,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        }
    },{new:true});
    return curso;
}

// Funcion asincrona para Desacticar cursos
async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado:false
        }
    },{new:true});
    return curso;
}

// Funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({"estado": true});
    return cursos;
    
}

// Funcion asincrona para obtener curso por ID
async function obtenerCursoPorId(id) {
    try {
        let curso = await Curso.findById(id);
        if (!curso) {
        throw new Error( `El curso con la ID ${id} no fue encontrado`);
        }
        return curso;
    } catch (err) {
        console.error(`Error al buscar el curso:${err.message}`);
        throw err;
    }  
}

// Funcion asincrona para obtener usuarios por ID de curso
async function obtenerUsuariosPorCursoId(Id) {
    try {
        let usuarios = await Usuario.find({ cursos: Id, estado: true });
        if (!usuarios) {
           throw new Error('No se encontraron usuarios para este curso');
       }
       return usuarios;
    } catch (err) {
        console.error(`Error al buscar usuarios asignado curso: ${err.message}`);
        throw err;
    }  
}

/*
// Función asíncrona para buscar usuarios asociados a un curso
async function obtenerUsuariosPorCursoId(id) {
    try {
        // Buscar usuarios que tengan el curso en su lista de cursos y hacer populate del campo 
        cursos
        const usuarios = await Usuario.find({ cursos: id }).populate('cursos', 'titulo');
        if (!usuarios || usuarios.length === 0) {
        throw new Error(`No se encontraron usuarios asociados al curso con ID ${id}`);
        }
        // Procesar los resultados para devolver solo los títulos de los cursos
        const usuariosConCursos = usuarios.map(usuario => {
            return {
                _id: usuario._id,
                email: usuario.email,
                nombre: usuario.nombre,
                password: usuario.password,
                estado: usuario.estado,
                cursos: usuario.cursos,
                __v: usuario.__v
            };
        });
        return usuariosConCursos;
    } catch (err) {
        console.error(`Error al buscar usuarios por curso: ${err.message}`);
        throw err;
    }
}*/

module.exports={
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos,
    obtenerCursoPorId,
    obtenerUsuariosPorCursoId
}