import { Schema, model } from "mongoose";

// Define the TypeScript interface
interface UserI {
  name: string;
  dept: string;
}

// Define the Mongoose schema
const userSchema = new Schema<UserI>({
  name: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

// Create the Mongoose model
const User = model<UserI>("User", userSchema);

export default User;
