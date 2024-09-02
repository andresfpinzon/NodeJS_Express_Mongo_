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

module.exports = {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos,
    crearColeccionUsuarios
};