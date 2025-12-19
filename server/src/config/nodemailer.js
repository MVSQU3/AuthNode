import nodemailer from "nodemailer";

// On utilise createTransport au lieu de createTestAccount
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // Tu avais écrit MAILTRAP_USER plus haut
    pass: process.env.MAILTRAP_PASS,
  },
});

export default transporter;
