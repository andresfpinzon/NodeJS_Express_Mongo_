const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursos'); 

/**
 * @swagger
 * tags:
 *   - name: Cursos
 *     description: API para gestionar cursos
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Retrieve a list of active courses
 *     responses:
 *       200:
 *         description: A list of active courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', cursoController.listarCursosActivos);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     tags: 
 *       - Cursos
 *     summary: Create a new course
 *     responses:
 *       201:
 *         description: Course created successfully.
 */
router.post('/', cursoController.crearCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     tags: 
 *       - Cursos
 *     summary: Update an existing course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *       404:
 *         description: Course not found.
 */
router.put('/:id', cursoController.actualizarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     tags: 
 *       - Cursos
 *     summary: Deactivate a course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course to deactivate
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deactivated successfully.
 *       404:
 *         description: Course not found.
 */
router.delete('/:id', cursoController.desactivarCurso);

/**
 * @swagger
 * /api/cursos/coleccion:
 *   post:
 *     tags: 
 *       - Cursos
 *     summary: Create a collection of courses
 *     responses:
 *       201:
 *         description: Courses collection created successfully.
 */
router.post('/coleccion', cursoController.crearColeccionCursos);

/**
 * @swagger
 * /api/cursos/{id}/usuarios:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Retrieve a course with its associated users by course ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course with users retrieved successfully.
 *       404:
 *         description: Course not found.
 */
router.get('/:id/usuarios', cursoController.obtenerCursoConUsuarios);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     tags: 
 *       - Cursos
 *     summary: Retrieve a course by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully.
 *       404:
 *         description: Course not found.
 */
router.get('/:id', cursoController.obtenerCursoPorId);

module.exports = router;
