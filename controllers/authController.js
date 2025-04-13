const jwt = require('jsonwebtoken'); // Para generar y verificar tokens JWT
const User = require('../models/User'); // Modelo de usuario para interactuar con la base de datos
const { successResponse, errorResponse } = require('../utils/responseHandler'); // Utilidades para manejar respuestas

// Controlador para el inicio de sesión
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, 'Usuario no encontrado');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, 'Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    successResponse(res, 200, 'Inicio de sesión exitoso', { token });
  } catch (error) {
    next(error);
  }
};

// Controlador para registrar un nuevo usuario
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, 'El email ya está registrado');
    }

    const user = new User({ username, email, password, role: 'user' });
    await user.save();

    successResponse(res, 201, 'Usuario registrado exitosamente', {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener el perfil del usuario autenticado
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return errorResponse(res, 404, 'Usuario no encontrado');
    }

    successResponse(res, 200, 'Perfil del usuario obtenido exitosamente', user);
  } catch (error) {
    next(error);
  }
};

// Controlador para actualizar el perfil del usuario autenticado
exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return errorResponse(res, 404, 'Usuario no encontrado');
    }

    successResponse(res, 200, 'Perfil actualizado exitosamente', user);
  } catch (error) {
    next(error);
  }
};

// Controlador para listar todos los usuarios (solo para administradores)
exports.getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .select('-password')
      .skip((page - 1) * limit)
      .limit(Number(limit));

    successResponse(res, 200, 'Usuarios obtenidos exitosamente', users);
  } catch (error) {
    next(error);
  }
};

// Controlador para eliminar un usuario (solo para administradores)
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return errorResponse(res, 404, 'Usuario no encontrado');
    }

    successResponse(res, 200, 'Usuario eliminado exitosamente');
  } catch (error) {
    next(error);
  }
};

// Controlador para cerrar sesión
exports.logout = async (req, res, next) => {
  try {
    // Opcional: puedes realizar alguna acción adicional aquí si es necesario
    successResponse(res, 200, 'Sesión cerrada exitosamente');
  } catch (error) {
    next(error);
  }
};