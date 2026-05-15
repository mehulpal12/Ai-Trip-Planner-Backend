import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: SendEmailOptions) => {
  await transporter.sendMail({
    from: `"AI Trip Planner" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};