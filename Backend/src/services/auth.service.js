import jwt from 'jsonwebtoken';
import * as userService from './user.service.js';

const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura'; //

export const loginUser = async (username, password) => {
    const user = await userService.findUserByUsername(username);

    // Verificación de credenciales (comparación básica para el proyecto)
    if (user && user.password === password) {
        const payload = { 
            id: user.id,
            user: user.username, 
            role: user.role 
        };
        
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    }
    return null;
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};