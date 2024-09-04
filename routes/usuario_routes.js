const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - nombre
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del usuario.
 *         email:
 *           type: string
 *           description: Email del usuario.
 *         nombre:
 *           type: string
 *           description: Nombre del usuario.
 *         password:
 *           type: string
 *           description: Contraseña del usuario.
 *         estado:
 *           type: boolean
 *           description: Estado del usuario (activo/inactivo).
 *           default: true
 *         imagen:
 *           type: string
 *           description: URL de la imagen del usuario.
 *         cursos:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs de los cursos a los que está inscrito el usuario.
 */

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
 *     summary: Obtiene una lista de usuarios activos
 *     responses:
 *       200:
 *         description: Colección de usuarios activos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                     email: "juan.perez@gmail.com"
 *                     nombre: "Juan Pérez"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-usuario.jpg"
 *                     cursos: ["61f7d2bbf1a2b4b5c3cdb71f", "61f7d2bbf1a2b4b5c3cdb720"]
 *                   - id: "61f7d2bbf1a2b4b5c3cdb71e"
 *                     email: "ana.gomez@gmail.com"
 *                     nombre: "Ana Gómez"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-usuario2.jpg"
 *                     cursos: ["61f7d2bbf1a2b4b5c3cdb721", "61f7d2bbf1a2b4b5c3cdb722"]
 */
router.get('/', usuarioController.listarUsuariosActivos);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Crear un usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 email: "nuevo.usuario@gmail.com"
 *                 nombre: "Nuevo Usuario"
 *                 password: "contraseña123"
 *                 estado: true
 *                 imagen: "https://ejemplo.com/imagen-nuevo-usuario.jpg"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb723"
 *                   email: "nuevo.usuario@gmail.com"
 *                   nombre: "Nuevo Usuario"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-nuevo-usuario.jpg"
 *                   cursos: []
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     tags: 
 *       - Usuarios
 *     summary: Actualizar un usuario mediante su email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Correo del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 nombre: "Usuario Actualizado"
 *                 password: "nuevacontraseña123"
 *                 estado: true
 *                 imagen: "https://ejemplo.com/imagen-usuario-actualizado.jpg"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                   email: "juan.perez@gmail.com"
 *                   nombre: "Usuario Actualizado"
 *                   estado: true
 *                   imagen: "https://eejemplo.com/imagen-usuario-actualizado.jpg"
 *                   cursos: ["61f7d2bbf1a2b4b5c3cdb71f", "61f7d2bbf1a2b4b5c3cdb720"]
 *       404:
 *         description: Usuario no encontrado.
 */
router.put('/:email', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     tags: 
 *       - Usuarios
 *     summary: Desactivar un usuario mediante su email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email del usuario a desactivar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                   email: "juan.perez@gmail.com"
 *                   nombre: "Juan Pérez"
 *                   estado: false
 *                   imagen: "https://ejemplo.com/imagen-usuario.jpg"
 *                   cursos: ["61f7d2bbf1a2b4b5c3cdb71f", "61f7d2bbf1a2b4b5c3cdb720"]
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete('/:email', usuarioController.desactivarUsuario);

/**
 * @swagger
 * /api/usuarios/coleccion:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Crear una colección de usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Usuario'
 *           examples:
 *             ejemplo1:
 *               value:
 *                 - email: "coleccion.usuario1@gmail.com"
 *                   nombre: "Coleccion Usuario 1"
 *                   password: "contraseña123"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-coleccion-usuario1.jpg"
 *                 - email: "coleccion.usuario2@gmail.com"
 *                   nombre: "Coleccion Usuario 2"
 *                   password: "contraseña123"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-coleccion-usuario2.jpg"
 *                 - email: "coleccion.usuario3@gmail.com"
 *                   nombre: "Coleccion Usuario 3"
 *                   password: "contraseña123"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-coleccion-usuario3.jpg"
 *     responses:
 *       201:
 *         description: Usuarios cargados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   - id: "61f7d2bbf1a2b4b5c3cdb723"
 *                     email: "coleccion.usuario1@gmail.com"
 *                     nombre: "Coleccion Usuario 1"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-coleccion-usuario1.jpg"
 *                     cursos: []
 *                   - id: "61f7d2bbf1a2b4b5c3cdb724"
 *                     email: "coleccion.usuario2@gmail.com"
 *                     nombre: "Coleccion Usuario 2"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-coleccion-usuario2.jpg"
 *                     cursos: []
 *                   - id: "61f7d2bbf1a2b4b5c3cdb725"
 *                     email: "coleccion.usuario3@gmail.com"
 *                     nombre: "Coleccion Usuario 3"
 *                     estado: true
 *                     imagen: "https://ejemplo.com/imagen-coleccion-usuario3.jpg"
 *                     cursos: []
 */
router.post('/coleccion', usuarioController.crearColeccionUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}/cursos:
 *   get:
 *     tags: 
 *       - Usuarios
 *     summary: Obtener un usuario y los cursos a los que está inscrito
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario y cursos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                   email: "juan.perez@gmail.com"
 *                   nombre: "Juan Pérez"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-usuario.jpg"
 *                   cursos: 
 *                     - id: "61f7d2bbf1a2b4b5c3cdb71f"
 *                       titulo: "Curso 1"
 *                       descripcion: "Descripción del Curso 1"
 *                       estado: "activo"
 *                       imagen: "https://ejemplo.com/imagen-curso1.jpg"
 *                     - id: "61f7d2bbf1a2b4b5c3cdb720"
 *                       titulo: "Curso 2"
 *                       descripcion: "Descripción del Curso 2"
 *                       estado: "activo"
 *                       imagen: "https://ejemplo.com/imagen-curso2.jpg"
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/:id/cursos', usuarioController.obtenerUsuarioConCursos);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags: 
 *       - Usuarios
 *     summary: Obtener un usuario mediante su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *             examples:
 *               ejemplo1:
 *                 value:
 *                   id: "61f7d2bbf1a2b4b5c3cdb71d"
 *                   email: "juan.perez@gmail.com"
 *                   nombre: "Juan Pérez"
 *                   estado: true
 *                   imagen: "https://ejemplo.com/imagen-usuario.jpg"
 *                   cursos: ["61f7d2bbf1a2b4b5c3cdb71f", "61f7d2bbf1a2b4b5c3cdb720"]
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/:id', usuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios/{id}/cursos/{cursoId}:
 *   post:
 *     tags: 
 *       - Usuarios
 *     summary: Asociar un curso a un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: cursoId
 *         required: true
 *         description: ID del curso que se quiere asociar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso asociado correctamente.
 *       404:
 *         description: Usuario o curso no encontrado.
 */
router.post('/:id/cursos/:cursoId', usuarioController.asociarCurso);

module.exports = router;

