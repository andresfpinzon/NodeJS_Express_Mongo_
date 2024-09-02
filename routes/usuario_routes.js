const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios'); 

// Definir rutas y asociarlas con las funciones del controlador
// Ruta GET
router.get('/', usuarioController.listarUsuariosActivos);
// Ruta POST
router.post('/', usuarioController.crearUsuario);
// Ruta PUT
router.put('/:email', usuarioController.actualizarUsuario);
// Ruta DELETE
router.delete('/:email', usuarioController.desactivarUsuario);
// Crear una colección de usuarios
router.post('/coleccion', usuarioController.crearColeccionUsuarios);
// Obtener usuario con cursos 
router.get('/:id/cursos', usuarioController.obtenerUsuarioConCursos);
// Obtener Usuario por su id
//router.get('/email/:email', usuarioController.obtenerUsuarioPorId);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
// Asociar un curso a un usuario
router.post('/:id/cursos/:cursoId', usuarioController.asociarCurso);



module.exports = router;
