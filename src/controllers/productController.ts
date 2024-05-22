import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { Inventory } from "../models/Inventory";
import { User } from "../models/User";
import { Tag } from "../models/Tag";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      brand,
      imageUrl,
      category,
      tags,
      inventory,
      createdBy,
    } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: "Category not found" });
    }
    const userExists = await User.findById(createdBy);
    if (!userExists) {
      return res.status(400).json({ message: "User not found" });
    }
    if (userExists.role != "admin") {
      return res.status(400).json({
        message: "Access forbidden. Only admins can perform this operation.",
      });
    }

    const tagList = await Tag.find({ _id: { $in: tags } });
    if (tagList.length !== tags.length) {
      return res.status(400).json({ message: "One or more tags not found" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discountPrice,
      brand,
      imageUrl,
      category: categoryExists._id,
      tags,
      inventory,
      createdBy: userExists._id,
    });
    await newProduct.save();

    categoryExists.products.push(newProduct._id as any);
    await categoryExists.save();

    await Tag.updateMany(
      { _id: { $in: tags } },
      { $push: { products: newProduct._id as any } }
    );

    const newInventory = new Inventory({
      stock: inventory.stock,
      product: newProduct._id as any,
    });
    await newInventory.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a Product by ID
const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      discountPrice,
      brand,
      imageUrl,
      category,
      tags,
      inventory,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        discountPrice,
        brand,
        imageUrl,
        category,
        tags,
        inventory,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a product by ID
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    Inventory.findOneAndDelete({ product: deletedProduct._id })
      .then(() => {
        console.log("Inventory removed successfully");
      })
      .catch((error) => {
        console.error("Error removing Inventory:", error);
      });

    Tag.findOneAndUpdate(
      { products: deletedProduct._id },
      { $pull: { products: deletedProduct._id } }
    )
      .then(() => {
        console.log("Product removed from the Tags successfully");
      })
      .catch((error) => {
        console.error("Error removing product from the Tags:", error);
      });

    Category.findOneAndUpdate(
      { products: deletedProduct._id },
      { $pull: { products: deletedProduct._id } }
    )
      .then(() => {
        console.log("Product removed from the category successfully");
      })
      .catch((error) => {
        console.error("Error removing product from the category:", error);
      });

    return res.status(200).json({
      message: "Product and related data deleted successfully",
      deletedProduct,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete multiple products by their IDs
const deleteMultipleProductsByIds = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });
    Inventory.deleteMany({ product: { $in: ids } })
      .then(() => {
        console.log("Inventory removed successfully");
      })
      .catch((error) => {
        console.error("Error removing Inventory:", error);
      });

    Tag.updateMany({ products: { $in: ids } }, { $pullAll: { products: ids } })
      .then(() => {
        console.log("Product removed from the Tags successfully");
      })
      .catch((error) => {
        console.error("Error removing product from the Tags:", error);
      });

    Category.updateMany(
      { products: { $in: ids } },
      { $pullAll: { products: ids } }
    )
      .then(() => {
        console.log("Product removed from the category successfully");
      })
      .catch((error) => {
        console.error("Error removing product from the category:", error);
      });

    return res.status(200).json({
      message: "Products and related data deleted successfully",
      deletedProducts,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteMultipleProductsByIds,
};
