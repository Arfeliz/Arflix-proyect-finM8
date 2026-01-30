export class User {
    constructor({ username, password, email, role = 'user' }) {
        this.id = Date.now().toString();
        this.username = username;
        this.password = password; // Nota: En producción, esto debe ir hasheado (ej. bcrypt)
        this.email = email;
        this.role = role;
        this.createdAt = new Date().toISOString();
    }
}