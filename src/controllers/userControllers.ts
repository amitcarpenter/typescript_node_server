import User from '../models/userModle';
import { Request, Response } from 'express';
import { comparePassword } from '../utils/bcrypt';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';


// Controller function for user registration
export const registerUser = async (req: Request, res: Response) => {

  const { username, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = new User({ username, password, email });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Controller function for user login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate access 
    let userID: any = user._id
    const accessToken = generateAccessToken(userID);

    // Generate refresh token
    const refreshToken = generateRefreshToken(userID);

    // Send access token as a cookie
    res.cookie('accessToken', accessToken, { httpOnly: true, sameSite: 'strict', maxAge: 900000 }); // 15 minutes

    // Send refresh token as a cookie
    res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict', maxAge: 604800000 }); // 7 days

    // Send response
    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
