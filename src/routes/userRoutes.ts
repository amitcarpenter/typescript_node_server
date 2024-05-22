import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/userControllers";
import { authenticateUser } from "../middlewares/auth";

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/refresh-token", refreshToken);
router.post("/auth/logout", authenticateUser, logoutUser);

export default router;
