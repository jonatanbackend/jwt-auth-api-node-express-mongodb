const { errorResponse } = require('../utils/responseHandler');

const validate = (schema) => (req, res, next) => {
  // Verificar si req.body está vacío
  if (!req.body || Object.keys(req.body).length === 0) {
    return errorResponse(res, 400, 'El cuerpo de la solicitud no puede estar vacío');
  }

  // Validar el cuerpo de la solicitud con Joi
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return errorResponse(res, 400, 'Error de validación', error.details);
  }

  next(); // Continuar al siguiente middleware o controlador si la validación es exitosa
};

module.exports = validate; // Exportar correctamente la función validate