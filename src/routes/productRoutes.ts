import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteMultipleProductsByIds,
} from "../controllers/productController";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
router.delete("/", deleteMultipleProductsByIds);

export default router;
