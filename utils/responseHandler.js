exports.successResponse = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  exports.errorResponse = (res, statusCode, message, details = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      details,
    });
  };