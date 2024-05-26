import { Schema, model, Document } from 'mongoose';

interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true }
});

export default AddressSchema;
