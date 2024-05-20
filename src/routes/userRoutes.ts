import express, { Request, Response } from "express";
import userControllers from "../controllers/userControllers";

const router = express.Router();

router.get("/home", userControllers.homePage);

export default router;
