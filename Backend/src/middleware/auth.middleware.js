import { verifyToken } from '../services/auth.service.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // El formato suele ser "Bearer TOKEN"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Acceso denegado. Token no proporcionado.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ status: 'error', message: 'Token inválido o expirado.' });
    }

    req.user = decoded; // Guardamos los datos del usuario en el request para usarlo luego
    next();
};