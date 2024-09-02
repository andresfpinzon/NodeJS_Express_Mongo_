const Usuario = require('../models/usuario_model');
const Curso = require('../models/curso_model');

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    // verificamos si el usuario ya existe en nuestra base de datos 
    let usuarioExistente = await Usuario.findOne({ email: body.email });
    if (usuarioExistente) {
        throw new Error('Un usuario registrado con ese email ya existe.');
    }

    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
        cursos: body.cursos
    });
    return await usuario.save();
}

// Funcion asincronica para actualizar un usuario
async function actualizarUsuario(email,body){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre: body.nombre,
            password: body.password,
            cursos: body.cursos
        } 
    }, {new: true});
    return usuario;
}

// Funcion asincronica para actualizar un usuario
async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        } 
    }, {new: true});
    return usuario;
}

// Funcion asincrona para listar todos los usuarios activos 
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}


// Funcion asincrona para obtener usuario por ID
async function obtenerUsuarioPorId(id) {
    //let usuario = await Usuario.findOne({ email: email });
    let usuario = await Usuario.findById(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario;
}

// Funcion asincrona para obtener cursos por ID de usuario
async function obtenerCursosPorUsuarioId(usuarioId) {
    let usuario = await Usuario.findById(usuarioId).populate('cursos');
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario.cursos;
}

// Funcion asincronica para asociar un curso a un usuario
async function asociarCursoAUsuario(usuarioId, cursoId) {
    cursoId = cursoId.trim();
    
    let usuario = await Usuario.findById(usuarioId);
    let curso = await Curso.findById(cursoId);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    if (!curso) {
        throw new Error('Curso no encontrado');
    }
    if (!usuario.cursos.includes(cursoId)) {
        usuario.cursos.push(cursoId);
        await usuario.save();
    }
    return usuario;
}

module.exports ={
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos,
    obtenerUsuarioPorId,
    obtenerCursosPorUsuarioId,
    asociarCursoAUsuario
}
