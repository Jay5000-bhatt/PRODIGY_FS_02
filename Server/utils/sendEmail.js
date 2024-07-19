const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, text }) => {
  console.log("Sending email to:", to);
  console.log("Subject:", subject);
  console.log("Text:", text);

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(EMAIL_USER);
  console.log(EMAIL_PASS);

  let mailOptions = {
    from: `"Admin Registration" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
