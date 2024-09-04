const logic = require('../logic/usuario_logic');
const schema = require('../validation/usuario_validation');

// Crear usuario
async function crearUsuario(req, res) {
    let body = req.body;

    const { error, value } = schema.validate({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        cursos: body.cursos
    });

    if (!error) {
        try {
            let usuario = await logic.crearUsuario(body);
            res.json({ valor: usuario });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else {
        res.status(400).json({ error: error.details[0].message });
    }
};

// Actualizar usuario
function actualizarUsuario(req, res) {
    const { error, value } = schema.validate({ 
        nombre: req.body.nombre,
        cursos: req.body.cursos
     });

    if (!error) {
        logic.actualizarUsuario(req.params.email, req.body)
            .then(valor => res.json({ valor }))
            .catch(err => res.status(400).json({ error: err.message }));
    } else {
        res.status(400).json({ error });
    }
};

// Desactivar usuario
function desactivarUsuario(req, res) {
    logic.desactivarUsuario(req.params.email)
        .then(valor => res.json({ usuario: valor }))
        .catch(err => res.status(400).json({ err }));
};

// Listar usuarios activos
function listarUsuariosActivos(req, res) {
    logic.listarUsuariosActivos()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json({
            message: 'Error al listar los usuarios activos',
            error: err.message
        }));
};

// Crear una coleccion de usuarios
async function crearColeccionUsuarios (req, res) {
    const usuarios = req.body.usuarios;

    const resultados = [];
    for (let i = 0; i < usuarios.length; i++) {
        const { error, value } = schema.validate(usuarios[i]);

        if (!error) {
            try {
                let usuario = await logic.crearUsuario(usuarios[i]);
                resultados.push({ valor: usuario });
            } catch (err) {
                resultados.push({ error: err.message });
            }
        } else {
            resultados.push({ error: error.details[0].message });
        }
    }
    res.json(resultados);
};

// Obtener usuario por ID con sus cursos
async function obtenerUsuarioConCursos(req, res) {
    try {
        const usuario = await logic.obtenerUsuarioPorId(req.params.id); 
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const cursos = await logic.obtenerCursosPorUsuarioId(req.params.id);
        res.json({ usuario, cursos });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Obtener usuario por id
async function obtenerUsuarioPorId(req, res) {
    try {
        //const usuario = await logic.obtenerUsuarioPorId(req.params.email);
        const usuario = await logic.obtenerUsuarioPorId(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Asociar curso a usuario
async function asociarCurso(req, res) {
    try {
        const usuarioId = req.params.id;
        const cursoId = req.params.cursoId;

        let usuario = await logic.asociarCursosAUsuario(usuarioId, cursoId);
        res.json({ usuario });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos,
    crearColeccionUsuarios,
    obtenerUsuarioConCursos,
    obtenerUsuarioPorId,
    asociarCurso

};