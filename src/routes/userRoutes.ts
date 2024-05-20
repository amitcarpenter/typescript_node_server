import { Router } from 'express';
import { registerUser } from '../controllers/userControllers';

const router = Router();

// Register route
router.post('/register', registerUser);
    
export default router;
