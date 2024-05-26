import { Request, Response } from 'express';
import { Settings } from '../models/Settings';

// Get all settings
export const getAllSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single setting by key
export const getSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const setting = await Settings.findOne({ key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new setting
export const createSetting = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    const existingSetting = await Settings.findOne({ key });
    if (existingSetting) {
      return res.status(400).json({ message: 'Setting already exists' });
    }
    const newSetting = new Settings({ key, value });
    await newSetting.save();
    res.status(201).json(newSetting);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update an existing setting
export const updateSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const updatedSetting = await Settings.findOneAndUpdate(
      { key },
      { value },
      { new: true }
    );
    if (!updatedSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json(updatedSetting);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a setting
export const deleteSetting = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const deletedSetting = await Settings.findOneAndDelete({ key });
    if (!deletedSetting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
