const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.emailOTP = function (to, otp) {
  return transporter.sendMail({
    from: `"Notes Website" ${process.env.EMAIL_ID}`,
    to,
    subject: "Verification Code for notes Account",
    text: `Hello,
    
    Your verification code for your notes account is: ${otp}
    Please use this code to verify your account.
    
    Thank you,
    The notes Team
  
    --
    `,
  });
};
