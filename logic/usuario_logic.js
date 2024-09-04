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

/*
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
}*/

// Función asíncrona para actualizar un usuario y agregar cursos al array de cursos
async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOne({"email": email});
    if (!usuario) {
    throw new Error('Usuario no encontrado');
    }
    // Verificar si hay cursos para agregar
    if (body.cursos && body.cursos.length > 0) {
        // Filtrar los cursos que ya están en el array para evitar duplicados
        const nuevosCursos = body.cursos.filter(cursoId => !usuario.cursos.includes(cursoId));
        // Agregar los nuevos cursos al array de cursos del usuario
        usuario.cursos.push(...nuevosCursos);
    }
    // Actualizar los demás campos
    usuario.nombre = body.nombre || usuario.nombre;
    usuario.password = body.password || usuario.password;
    usuario.estado = body.estado !== undefined ? body.estado : usuario.estado;
    usuario.imagen = body.imagen || usuario.imagen;
    // Guardar los cambios en la base de datos
    await usuario.save();
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

/*
// Funcion asincrona para listar todos los usuarios activos 
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({"estado": true});
    return usuarios;
}*/

//Función asíncrona para listar todos los usuarios activos
async function listarUsuariosActivos(){
    let usuarios = await Usuario.find({ "estado": true }).populate({
        path: 'cursos',
        select: 'titulo' // Selecciona solo el campo 'titulo' del curso
    });
    // Mapea los usuarios para devolver solo los títulos de los cursos
    usuarios = usuarios.map(usuario => {
        const cursosSoloTitulos = usuario.cursos.map(curso => curso.titulo);
        return {
        _id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        password: usuario.password,
        estado: usuario.estado,
        imagen: usuario.imagen,
        cursos: cursosSoloTitulos, // Reemplaza los cursos con solo los títulos
        __v: usuario.__v
    };
});
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

/*// Funcion asincronica para asociar un curso a un usuario
async function asociarCursosAUsuario(usuarioId, cursoId) {
    cursoId = cursoId.trim();
    try {
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
        } catch (error) {
            throw new Error(`Error al agregar cursos: ${error.message}`);
        }
}*/

// Agregar uno o varios cursos a un usuario
async function asociarCursosAUsuario(email, cursosIds) {

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
        throw new Error('Usuario no encontrado');
        }
        // Filtrar los cursos ya existentes para no duplicarlos
        const nuevosCursos = cursosIds.filter(cursoId => !usuario.cursos.includes(cursoId));
        // Agregar los nuevos cursos al array de cursos del usuario
        usuario.cursos = [...usuario.cursos, ...nuevosCursos];
        await usuario.save();
        return usuario;
    
}

module.exports ={
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos,
    obtenerUsuarioPorId,
    obtenerCursosPorUsuarioId,
    asociarCursosAUsuario
}
