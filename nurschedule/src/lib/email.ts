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
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "charmanderv123@gmail.com",
  subject: "Automated Email from NurSchedule Service",
  text: "A new slot is available for booking. \nDate: [INSERT DATE]\nTime: [INSERT TIME] Please check the NurSchedule service for further details.",
};

// Function to send mail
export const sendEmail = async () => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Call the function if needed immediately
sendEmail();
