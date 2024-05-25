import { Router } from "express";
import { createOrder, getAllOrders, getOrderById, updateOrderToPaid } from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderToPaid);
// router.delete("/:id", );
// router.delete("/", deleteMultipleProductsByIds);

export default router;
