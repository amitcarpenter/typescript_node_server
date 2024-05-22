// controllers/categoryController.ts
import { Request, Response } from "express";
import { Category } from "../models/Category";

// Create a new category
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(400).json({
        message: "Category Already Exist",
      });
    }
    const newCategory = new Category({ name, description });
    await newCategory.save();
    return res.status(201).json({
      message: "Category Create Success Fully",
      newCategory: newCategory,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({
      message: "Category Update SuccessFully",
      updatedCategory: updatedCategory,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({
      message: `${deletedCategory.name} Category deleted`,
      count: 1,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete multiple categories
const deleteMultipleCategories = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid array of category IDs" });
    }

    const result = await Category.deleteMany({ _id: { $in: ids } });
    return res
      .status(200)
      .json({
        deletedCategories: result,
        message: `${result.deletedCount} categories deleted`,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteMultipleCategories,
};
