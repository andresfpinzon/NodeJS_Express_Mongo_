const logic = require('../logic/curso_logic');
const schema = require('../validation/curso_validation');

// Crear curso
async function crearCurso(req, res) {
    let body = req.body;

    const { error, value } = schema.validate({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion,
        estado: body.estado,
        imagen: body.imagen,
        curso: body.curso
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
        calificacion: req.body.calificacion,
        estado: body.estado,
        imagen: body.imagen
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

/*
// Listar cursos activos
function listarCursosActivos(req, res) {
    logic.listarCursosActivos()
        .then(cursos => res.json(cursos))
        .catch(err => res.status(400).json(err));
};*/

// Controlador para listar los cursos activos
const listarCursosActivos = async (req, res) => {
    try {
        const cursosActivos = await logic.listarCursosActivos();
        if (cursosActivos.length === 0) {
        return res.status(204).send(); // 204 No Content
        }
        res.json(cursosActivos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear colecciones de cursos
async function crearColeccionCursos (req, res) {
    const cursos = req.body.cursos; 

    const resultados = [];
    for (let i = 0; i < cursos.length; i++) {
        const { error, value } = schema.validate({
            titulo: cursos[i].titulo,
            descripcion: cursos[i].descripcion,
            alumnos: cursos[i].alumnos,
            calificacion: cursos[i].calificacion
        });

        if (!error) {
            try {
                let curso = await logic.crearCurso(cursos[i]);
                resultados.push({ valor: curso });
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
async function obtenerCursoConUsuarios(req, res) {
    try {
        const curso = await logic.obtenerCursoPorId(req.params.id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }
        const usuarios = await logic.obtenerUsuariosPorCursoId(req.params.id);
        res.json({ curso, usuarios });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Obtener curso por ID
async function obtenerCursoPorId(req, res) {
    try {
        const curso = await logic.obtenerCursoPorId(req.params.id);
        if (curso) {
            res.json(curso);
        } else {
            res.status(404).json({ error: 'Curso no encontrado' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos,
    crearColeccionCursos,
    obtenerCursoConUsuarios,
    obtenerCursoPorId 
}