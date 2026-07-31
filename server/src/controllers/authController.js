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
  } catch (error) {}
};
