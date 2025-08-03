import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_APP_PASSWORD, // Use an App Password, not your main password
  },
});

// Email options

// Function to send mail
export async function sendEmail(recipient: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: "Automated Email from NurSchedule Service",
    text: "A new slot is available for booking. Please check the NurSchedule service for further details.",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Call the function if needed immediately
