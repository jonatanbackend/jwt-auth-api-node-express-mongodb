const { errorResponse } = require('../utils/responseHandler');

const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log del error para depuración

  // Si el error es de validación (por ejemplo, Joi)
  if (err.isJoi) {
    return errorResponse(res, 400, 'Error de validación', err.details);
  }

  // Respuesta genérica para errores no manejados
  errorResponse(res, err.statusCode || 500, err.message || 'Error interno del servidor');
};

module.exports = errorMiddleware;