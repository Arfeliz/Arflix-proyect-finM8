import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'data', 'users.json');

const readUsers = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch { 
        return []; 
    }
};

export const findUserByUsername = async (username) => {
    const users = await readUsers();
    return users.find(u => u.username === username);
};

export const createUser = async (userData) => {
    const users = await readUsers();
    if (users.find(u => u.username === userData.username)) {
        throw new Error('El usuario ya existe'); // Error capturado por el middleware global
    }
    users.push(userData);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return userData;
};

export const getAllUsers = async () => await readUsers();

export const getUserById = async (id) => {
    const users = await readUsers();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
};

export const deleteUserById = async (id) => {
    const users = await readUsers();
    const filtered = users.filter(u => u.id !== id);
    if (users.length === filtered.length) throw new Error('Usuario no encontrado');
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
};