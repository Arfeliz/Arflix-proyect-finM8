// middleware/error.middleware.js
export const errorHandler = (err, req, res, next) => {
    // Si es un error de validación de Zod
    if (err.errors) {
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación de datos',
            errors: err.errors
        });
    }

    // Errores genéricos del servidor
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error interno del servidor'
    });
};