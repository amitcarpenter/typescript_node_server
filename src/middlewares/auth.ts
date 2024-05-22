// import { Request as ExpressRequest, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { User, UserI } from "../models/User";
// import { refreshToken } from "../controllers/userControllers";

// import dotenv from "dotenv";
// dotenv.config();
// const JWT_SECRET = process.env.JWT_SECRET as string;
// const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

// interface AuthenticatedRequest extends ExpressRequest {
//   user?: UserI;
// }

// // Function for Authenticate User
// const authenticateUser = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token = req.cookies["accessToken"];
//     const refresh_token = req.cookies["refreshToken"];

//     if (!token) {
//       if (!refresh_token) {
//         return res.status(401).json({ message: "Access token not found" });
//       } else {
//         await refreshToken_get_access_token_middleware(req, res, next);
//       }
//     }
//     const decoded: any = jwt.verify(token, JWT_SECRET);
//     const userId = decoded.userId;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         message: "Access forbidden. Only admins can perform this operation.",
//       });
//     }
//     req.user = user;
//     next();
//   } catch (error: any) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Middle ware for the regenerate access token with help of the refresh token
// const refreshToken_get_access_token_middleware = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const refreshToken = req.cookies["refreshToken"];

//   if (!refreshToken) {
//     return res.status(401).json({ message: "Refresh token missing" });
//   }

//   try {
//     const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
//       userId: string;
//       userRole: string;
//     };

//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ message: "Invalid refresh token" });
//     }

//     const accessToken = jwt.sign(
//       { userId: user._id, userRole: user.role },
//       JWT_SECRET,
//       { expiresIn: JWT_EXPIRATION }
//     );
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       sameSite: "strict",
//       maxAge: 900000,
//     });
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     return res.status(401).json({ message: "Invalid or expired refresh token" });
//   }
// };

// export { authenticateUser };



import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserI } from "../models/User";

import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

interface AuthenticatedRequest extends ExpressRequest {
  user?: UserI;
}

// Middleware for refreshing token
const refreshToken_get_access_token_middleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
      userId: string;
      userRole: string;
    };

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

    req.user = user;
    next();
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Middleware for authenticating user
const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    const refresh_token = req.cookies["refreshToken"];

    if (!token) {
      if (!refresh_token) {
        return res.status(401).json({ message: "Access token not found" });
      } else {
        return refreshToken_get_access_token_middleware(req, res, next);
      }
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access forbidden. Only admins can perform this operation.",
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { authenticateUser, refreshToken_get_access_token_middleware };
