import { Schema, model, Document } from 'mongoose';

interface ISettings extends Document {
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Settings = model<ISettings>('Settings', SettingsSchema);
