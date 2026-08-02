import User from "../models/userModel.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, Email, and Password are required.",
      });
    }

    if (!["buyer", "seller"].includes(role)) {
      return res.status(400).json({
        message: "Choose either buyer or seller role",
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    console.log(verificationToken);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "seller" ? false : true,
      verificationToken,
    });

    try {
      await sendEmail({
        email,
        subject: "Verify Your Email - KDRent Platform",
        message: `<p>Your email verificaion code is : <strong>${verificationToken}</strong> </p>  <p>Please enter this code on the verificaiton page to activate your account.</p>`,
      });
    } catch (emailError) {
      console.log("Failed to send verificaion email:", emailError);
      // we will still create the user
    }

    return res.status(201).json({
      message:
        "User registerd. Please check your email for the verification code",
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// verify the email

export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email and code are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verifed",
      });
    }

    if (user.verificationToken !== code) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are requried!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Your account isn't verified!, Please contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const userData = user.toObject();

    delete userData.password;

    if (user.isBlocked) {
      return res.status(401).json({
        success: false,
        message: "Your account has been blocked by Admin, Contact Support!",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: userData,
      token,
    });
  } catch (loginError) {
    return res.status(500).json({
      success: false,
      message: loginError,
    });
  }
};

// Get Me

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
