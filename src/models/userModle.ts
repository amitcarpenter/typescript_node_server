import { Schema, model, Document } from "mongoose";

interface User_Interface {
  username: string;
  email: string;
  password: string;
}

const user_schema = new Schema<User_Interface>({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
    minlength: [5, "username must be at least 5 characters long"],
  },

  password: {
    type: String,
      
  },
});
