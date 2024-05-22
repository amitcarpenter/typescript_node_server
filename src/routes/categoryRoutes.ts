// routes/categoryRoutes.ts
import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteMultipleCategories,
} from "../controllers/categoryController";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.delete("/", deleteMultipleCategories);

export default router;
