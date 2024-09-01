const Usuario = require('../models/usuario_model');

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
        password: body.password
    });
    return await usuario.save();
}

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

module.exports ={
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}
