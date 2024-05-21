import { Schema, model, Document } from "mongoose";
import { hashPassword } from "../utils/bcrypt";

interface User_Interface extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const user_schema = new Schema<User_Interface>(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
      minlength: [5, "username must be at least 5 characters long"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters long"],
      validate: {
        validator: function (v: string) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
            v
          );
        },
        message: (props: any) =>
          `${props.value} is not a valid password! Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character.`,
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Email Is Not Valid"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Define the pre-save hook before creating the model
user_schema.pre<User_Interface>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

const User = model<User_Interface>("User", user_schema);

export default User;
