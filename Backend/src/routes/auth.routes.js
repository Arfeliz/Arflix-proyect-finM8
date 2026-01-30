import { Router } from 'express';
import { login, register,deleteUser,getUser,getAllUsers } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', getUser);

export default router;