const nodemailer = require("nodemailer");

// Function to send email
const sendEmail = async ({ email, subject, text }) => {
  // Log the email details
  console.log("Sending email to:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);

  // Create a transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail username
      pass: process.env.EMAIL_PASS, // Your Gmail password
    },
  });

  console.log(EMAIL_USER);
  console.log(EMAIL_PASS);

  // Setup email data
  let mailOptions = {
    from: `"Admin Registration" <${process.env.EMAIL_USER}>`, // Sender address
    to: email, // Recipient's email address
    subject: subject, // Subject line
    text: text, // Plain text body
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
