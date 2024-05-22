import { Request, Response } from "express";
import { Inventory } from "../models/Inventory";

// Create a new inventory item
const createInventoryItem = async (req: Request, res: Response) => {
  try {
    const { product, stock } = req.body;
    const newInventoryItem = new Inventory({ product, stock });
    await newInventoryItem.save();
    return res.status(201).json({
      message: "Inventory item created successfully",
      inventoryItem: newInventoryItem,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get inventory by product
const getInventoryByProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    const inventory = await Inventory.findOne({ product: id });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    return res.status(200).json(inventory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all inventory items
const getAllInventoryItems = async (req: Request, res: Response) => {
  try {
    const inventoryItems = await Inventory.find();
    return res.status(200).json(inventoryItems);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single inventory item by ID
const getInventoryItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    return res.status(200).json(inventoryItem);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update an inventory item
const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product, stock } = req.body;
    const updatedInventoryItem = await Inventory.findByIdAndUpdate(
      id,
      { product, stock },
      { new: true }
    );
    if (!updatedInventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    return res.status(200).json({
      message: "Inventory item updated successfully",
      updatedInventoryItem,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete an inventory item
const deleteInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedInventoryItem = await Inventory.findByIdAndDelete(id);
    if (!deletedInventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    return res.status(200).json({
      message: "Inventory item deleted successfully",
      deletedInventoryItem,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete multiple InventoryItems
const deleteMultipleInventoryItems = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid array of tag IDs" });
    }

    const result = await Inventory.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} Inventory Items deleted successfully`,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createInventoryItem,
  getInventoryByProduct,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  deleteMultipleInventoryItems,
};
