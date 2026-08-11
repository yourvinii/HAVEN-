import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

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

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    //1 check email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // 4. Generate new 6 digit OTP
    const verificationOTP = Math.floor(
      10000 + Math.random() * 900000,
    ).toString();

    // 5. OTP expiry - 10 minutes
    const verificationOTPExpire = new Date(Date.now() + 10 * 60 * 1000);

    // 6. update user
    user.verificationOTP = verificationOTP;
    user.verificationOTPExpire = verificationOTPExpire;

    await user.save();

    // 7. Send new OTP email
    await sendEmail({
      email,
      subject: "HAVEN New Verification OTP",
      message: `Your new HAVEN verification OTP is ${verificationOTP}. It s valid for 10 minutes`,
    });

    // 8. Response
    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.log("Resend OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    //2. Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before login.",
      });
    }
    // 4. Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    //5. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // 7. Send response
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Login Error: ", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { registerUser, verifyOTP, resendOTP, loginUser };
