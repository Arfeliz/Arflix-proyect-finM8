import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './src/middleware/logger.js';
import { errorHandler } from './src/middleware/error.middleware.js'; // Importación obligatoria
import movieRoutes from './src/routes/movie.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares Globales
app.use(cors()); // Manejo de CORS
app.use(logger); // Logging de peticiones
app.use(express.json()); // Procesamiento de JSON

// 2. Archivos Estáticos
app.use('/uploads', express.static('uploads')); // Acceso a carátulas de películas

// 3. Rutas de la API (Arquitectura MVC)
app.use('/api/movies', movieRoutes); // Rutas de catálogo y tráilers
app.use('/api/auth', authRoutes);     // Rutas de usuarios y autenticación

// 4. Ruta Base
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Movie API', version: '1.0.0' });
});

// 5. Manejo Centralizado de Errores (Requisito de Evaluación)
// Debe ir después de todas las rutas
app.use(errorHandler); 

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});

export default app; // Útil para las pruebas de integración con Supertest