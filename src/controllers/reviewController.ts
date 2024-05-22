import { Request, Response } from "express";
import { Review, IReview } from "../models/Review";
import { Product } from "../models/Product";

// Create a new review
const createReview = async (req: Request, res: Response) => {
  try {
    const { comment, rating, product, user } = req.body;
    const newReview = new Review({ comment, rating, product, user });
    await newReview.save();

    const product_review = await Product.findById(product);
    if (!product_review) {
      return res.status(400).json({ message: "Category not found" });
    }
    product_review.reviews.push(newReview._id as any);
    await product_review.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews by product ID
const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId });
    res.status(200).json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review by ID
const updateReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { comment, rating },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review by ID
const deleteReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    Product.findOneAndUpdate(
      { reviews: deletedReview._id },
      { $pull: { reviews: deletedReview._id } }
    )
      .then(() => {
        console.log("Review removed from the Product successfully");
      })
      .catch((error) => {
        console.error("Error removing product from the Review:", error);
      });

    res
      .status(200)
      .json({ message: "Review deleted successfully", review: deletedReview });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete multiple reviews by IDs
const deleteMultipleReviews = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // Array of review IDs to delete

    // Check if IDs are provided
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide valid review IDs" });
    }

    // Delete multiple reviews by IDs
    const deletedReviews = await Review.deleteMany({ _id: { $in: ids } });


    
    Product.updateMany({ reviews: { $in: ids } }, { $pullAll: { reviews: ids } })
      .then(() => {
        console.log("Reviews removed from the Product successfully");
      })
      .catch((error) => {
        console.error("Error removing Reviews:", error);
      });

    return res.status(200).json({
      message: `${deletedReviews.deletedCount} reviews deleted successfully`,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReviewById,
  deleteReviewById,
  deleteMultipleReviews,
};
