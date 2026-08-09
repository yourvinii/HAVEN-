import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HAVEN" <${process.env.EMAIL_USER}> `,
      to: email,
      subject,
      text: message,
    });

    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.log("Email sending Failed:", error.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
