import * as authService from '../services/auth.service.js';
import * as userService from '../services/user.service.js';
import { User } from '../models/user.model.js';

export const login = async (req, res) => {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);

    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas' });
    }

    res.json({ status: 'success', token });
};

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: 'error', message: 'Faltan datos obligatorios' });
        }

        const newUser = new User({ username, password, email });
        const savedUser = await userService.createUser(newUser);

        // No devolvemos el password en la respuesta
        const { password: _, ...userResponse } = savedUser;
        
        res.status(201).json({ status: 'success', data: userResponse });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

//borrar usuario (solo admin)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUserById(id);
        res.json({ status: 'success', message: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

//mostrar usuario (solo admin)
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.json({ status: 'success', data: user });
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        // Mapeo simple para omitir contraseñas si no tienes un DTO de usuario aún
        const sanitizedUsers = users.map(({ password, ...user }) => user);
        
        res.json({ status: 'success', data: sanitizedUsers });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};


