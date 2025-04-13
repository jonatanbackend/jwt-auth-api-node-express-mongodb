const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseHandler');

// Esquema de validación para el login
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es requerido',
    'string.email': 'El email debe ser válido',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es requerida',
  }),
});

// Esquema de validación para el registro
const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'El nombre de usuario es requerido',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es requerido',
    'string.email': 'El email debe ser válido',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'La contraseña es requerida',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
  }),
});

// Middleware para proteger rutas
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return errorResponse(res, 401, 'No autorizado, no se proporcionó un token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar los datos del usuario al objeto req
    next();
  } catch (error) {
    return errorResponse(res, 401, 'No autorizado, token inválido');
  }
};

// Middleware para verificar roles específicos
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 403, 'No autorizado para acceder a esta ruta');
    }
    next();
  };
};

module.exports = { loginSchema, registerSchema, protect, authorize };