import { Request, Response } from "express";
import { Tag } from "../models/Tag";

// Create a new tag
const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const existTag = await Tag.findOne({ name });
    if (existTag) {
      return res.status(400).json({
        message: "Tag already exists",
      });
    }
    const newTag = new Tag({ name });
    await newTag.save();
    return res.status(201).json({
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all tags
const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    return res.status(200).json(tags);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single tag by ID
const getTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json(tag);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a tag
const updateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json({
      message: "Tag updated successfully",
      tag: updatedTag,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// Delete a tag
const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (!deletedTag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json({
      message: "Tag deleted successfully",
      tag: deletedTag,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete multiple tags
const deleteMultipleTags = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide a valid array of tag IDs" });
    }

    const result = await Tag.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({
      message: `${result.deletedCount} tags deleted successfully`,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
  deleteMultipleTags,
};
