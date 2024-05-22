import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewById,
  deleteReviewById,
  deleteMultipleReviews,
} from "../controllers/reviewController";

const router = express.Router();

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:productId", getReviewsByProduct);
router.put("/:id", updateReviewById);
router.delete("/:id", deleteReviewById);
router.delete("/", deleteMultipleReviews);

export default router;
