import express from "express";
import {
  createInventoryItem,
  getInventoryByProduct,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  deleteMultipleInventoryItems,
} from "../controllers/inventoryController";

const router = express.Router();

router.post("/", createInventoryItem);
router.get("/product/:id", getInventoryByProduct);
router.get("/", getAllInventoryItems);
router.get("/:id", getInventoryItemById);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);
router.delete("/", deleteMultipleInventoryItems);

export default router;
