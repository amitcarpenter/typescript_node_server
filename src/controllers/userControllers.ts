import User from "../models/userModle";
import { Request, Response } from "express";
import { comparePassword } from "../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

// InterFace For the Email Varification
interface EmailVerificationResult {
  success: boolean;
  error?: string;
}

// Varify Email Function
function verifyEmail(email: string): Promise<EmailVerificationResult> {
  return new Promise((resolve) => {
    if (!email) {
      resolve({ success: false, error: "Email is required" });
      return;
    }
    const pythonProcess: ChildProcessWithoutNullStreams = spawn("python", [
      "src/config/verify_email.py",
      email,
    ]);
    let resultBuffer: Buffer = Buffer.alloc(0);
    let errorBuffer: Buffer = Buffer.alloc(0);

    pythonProcess.stdout.on("data", (data: Buffer) => {
      resultBuffer = Buffer.concat([resultBuffer, data]);
    });

    pythonProcess.stderr.on("data", (data: Buffer) => {
      errorBuffer = Buffer.concat([errorBuffer, data]);
    });

    pythonProcess.on("close", (code: number) => {
      if (code === 0) {
        const result = JSON.parse(resultBuffer.toString());
        resolve(result);
      } else {
        const error = errorBuffer.toString() || "Unknown error occurred";
        resolve({ success: false, error });
      }
    });
  });
}



// Controller function for user registration
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email, role } = req.body;
  try {
    const result = await verifyEmail(email);

    if (!result.success) {
      return res.status(400).json({ message: "Email is not valid. Please provide a valid email address." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the new user
    const newUser = new User({ username, password, email, role });
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Register successfully", user: newUser });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Controller function for user login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate access and refresh tokens with user role included
    const userId: any = user._id;
    const userRole: string = user.role;
    const accessToken = generateAccessToken({ userId, userRole });
    const refreshToken = generateRefreshToken({ userId, userRole });

    // Send access token as a cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 900000, // 15 minutes
    });

    // Send refresh token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 604800000, // 7 days
    });

    // Send response with user's role
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: userId,
        email: user.email,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Generate new access token using refresh token
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
      userId: string;
      userRole: string;
    };

    // Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, userRole: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 900000,
    });

    // Send response
    res
      .status(200)
      .json({ message: "New access token generated", accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Logout User
export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};
