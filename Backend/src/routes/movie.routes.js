import { Router } from 'express';
import { getMovies, postMovie, putMovie, removeMovie} from '../controllers/movie.controller.js';
import { upload } from '../middleware/multer.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = Router();

// Ruta pública
router.get('/', getMovies);

// Rutas protegidas (el usuario debe estar logueado)
router.post('/', authenticateToken, upload.single('coverImage'), postMovie);
router.put('/:id', authenticateToken, putMovie);
router.delete('/:id', authenticateToken, removeMovie);

export default router;