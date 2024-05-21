import { Router } from "express";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/userControllers";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post('/auth/refresh-token', refreshToken);
router.post('/auth/logout', logoutUser);



export default router;
