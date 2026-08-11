import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const protect = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token required",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //4. Find User
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // 6. Attach user to request
    req.user = user;

    //7. Continue to controller
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;
