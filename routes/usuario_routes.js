const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios'); 

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: API para gestionar usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: 
 *       - Usuarios
 *     summary: Retrieve a list of active users
 *     responses:
 *       200:
 *         description: A list of active users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', usuarioController.listarUsuariosActivos);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     tags: 
 *       - Usuarios
 *     summary: Update an existing user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the user to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put('/:email', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     tags: 
 *       - Usuarios
 *     summary: Deactivate a user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the user to deactivate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deactivated successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/:email', usuarioController.desactivarUsuario);

/**
 * @swagger
 * /api/usuarios/coleccion:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Create a collection of users
 *     responses:
 *       201:
 *         description: Users collection created successfully.
 */
router.post('/coleccion', usuarioController.crearColeccionUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}/cursos:
 *   get:
 *     tags: 
 *       - Usuarios
 *     summary: Retrieve a user with their associated courses by user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User with courses retrieved successfully.
 *       404:
 *         description: User not found.
 */
router.get('/:id/cursos', usuarioController.obtenerUsuarioConCursos);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags: 
 *       - Usuarios
 *     summary: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully.
 *       404:
 *         description: User not found.
 */
router.get('/:id', usuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/{id}/cursos/{cursoId}:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Associate a course with a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID of the course to associate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course associated with user successfully.
 *       404:
 *         description: User or course not found.
 */
router.post('/:id/cursos/:cursoId', usuarioController.asociarCurso);

module.exports = router;

