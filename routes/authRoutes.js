const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware');
const { loginSchema, registerSchema } = require('../middleware/authMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getProfile, updateProfile, getAllUsers, deleteUser } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', validate(loginSchema), login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags:
 *       - Autenticación
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión cerrada
 */
router.post('/logout', protect, logout);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: Actualiza el perfil del usuario autenticado
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       400:
 *         description: Datos inválidos
 */
router.put('/profile', protect, updateProfile);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Obtiene todos los usuarios (solo admin)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       403:
 *         description: Prohibido
 */
router.get('/users', protect, authorize('admin'), getAllUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID (solo admin)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
