import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Generate 6 digit OTP
    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 5. OTP expiry - 10 minutes
    const verificationOTPExpire = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // 6. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "tenant",
      verificationOTP,
      verificationOTPExpire,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent for verification.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { registerUser };