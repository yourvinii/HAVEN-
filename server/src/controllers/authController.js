import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import sendEmail from "../utils/sendEmail.js";

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
      100000 + Math.random() * 900000,
    ).toString();

    // 5. OTP expiry - 10 minutes
    const verificationOTPExpire = new Date(Date.now() + 10 * 60 * 1000);

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

    await sendEmail({
      email,
      subject: "HAVEN Email Verification OTP",
      message: `Your HAVEN verification OTP is ${verificationOTP}. It is valid for 10 minutes`,
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

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    if (!user.verificationOTP || !user.verificationOTPExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP",
      });
    }

    if (user.verificationOTPExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    if (user.verificationOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invald OTP",
      });
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("Verifiy OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export { registerUser, verifyOTP };
