const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursos'); 

// Definir rutas y asociarlas con las funciones del controlador
// Ruta GET
router.get('/', cursoController.listarCursosActivos);
// Ruta POST
router.post('/', cursoController.crearCurso);
// Ruta PUT
router.put('/:id', cursoController.actualizarCurso);
// Ruta DELETE
router.delete('/:id', cursoController.desactivarCurso);
// Crear una colección de usuarios
router.post('/coleccion', cursoController.crearColeccionCursos);
// Obtener curso con usuarios
router.get('/:id/usuarios', cursoController.obtenerCursoConUsuarios);
// Obtener un curso por su id
router.get('/:id', cursoController.obtenerCursoPorId);

module.exports = router;