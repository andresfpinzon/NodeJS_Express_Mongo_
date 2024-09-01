const logic = require('../logic/curso_logic');
const schema = require('../validation/curso_validation');

// Crear curso
async function crearCurso(req, res) {
    let body = req.body;

    const { error, value } = schema.validate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });

    if (!error) {
        try {
            let curso = await logic.crearCurso(req.body);
            res.json({ valor: curso });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else {
        res.status(400).json({ error: error.details[0].message });
    }
};

// Actualizar curso
function actualizarCurso(req, res) {
    const { error, value } = schema.validate({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        alumnos: req.body.alumnos,
        calificacion: req.body.calificacion
    });

    if (!error) {
        logic.actualizarCurso(req.params.id, req.body)
            .then(curso => res.json(curso))
            .catch(err => res.status(400).json({ error: err.message }));
    } else {
        res.status(400).json({ error });
    }
};

// Desactivar curso
function desactivarCurso(req, res) {
    logic.desactivarCurso(req.params.id)
        .then(curso => res.json(curso))
        .catch(err => res.status(400).json(err));
};

// Listar cursos activos
function listarCursosActivos(req, res) {
    logic.listarCursosActivos()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json(err));
};

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}