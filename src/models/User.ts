// import { Schema, model, Document } from "mongoose";
// import { hashPassword } from "../utils/bcrypt";

// interface UserI extends Document {
//   username: string;
//   email: string;
//   password: string;
//   role: string;
//   products: Schema.Types.ObjectId[];
//   reviews: Schema.Types.ObjectId[];
// }

// const user_schema = new Schema<UserI>(
//   {
//     username: {
//       type: String,
//       required: [true, "username is required"],
//       trim: true,
//       unique: true,
//       minlength: [5, "username must be at least 5 characters long"],
//     },
//     password: {
//       type: String,
//       required: [true, "password is required"],
//       minlength: [6, "password must be at least 6 characters long"],
//       validate: {
//         validator: function (v: string) {
//           return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
//             v
//           );
//         },
//         message: (props: any) =>
//           `${props.value} is not a valid password! Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character.`,
//       },
//     },
//     email: {
//       type: String,
//       required: [true, "email is required"],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [/.+\@.+\..+/, "Email Is Not Valid"],
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       required: true,
//       default: "user",
//     },
//     products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
//     reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Define the pre-save hook before creating the model
// user_schema.pre<UserI>("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }

//   try {
//     const hashedPassword = await hashPassword(user.password);
//     user.password = hashedPassword;
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// const User = model<UserI>("User", user_schema);

// export = { User, UserI };


import { Schema, model, Document } from "mongoose";
import { hashPassword } from "../utils/bcrypt";

// Define the User interface
interface UserI extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  products: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
}

// Define the user schema
const user_schema = new Schema<UserI>(
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
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

// Define the pre-save hook before creating the model
user_schema.pre<UserI>("save", async function (next) {
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

// Create the User model
const User = model<UserI>("User", user_schema);

export { User, UserI };
