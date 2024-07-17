import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Load the HTML email template
const templatePath = path.join(
  __dirname,
  "../..",
  "src",
  "templates",
  "reset-password-email.html"
);
const emailTemplate = fs.readFileSync(templatePath, "utf-8");

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  fullName: string,
  expireIn?: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;

  const mailOptions = {
    from: `Abyssinia Homes, ${process.env.EMAIL_USER}`,
    to: email,
    subject: "Password Reset Request",
    html: emailTemplate
      .replace("{{fullName}}", fullName.split(" ")[0])
      .replace("{{resetLink}}", resetLink)
      .replace("{{expireIn}}", expireIn || "1 hour"),
  };

  const res = await transporter.sendMail(mailOptions);
  return res;
};
