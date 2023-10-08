const nodemailer = require('nodemailer');
const crypto = require('crypto');



const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, 
  },
});

// Send a password reset email
exports.sendPasswordResetEmail = async (req, res) => {
try {
    const { email } = req.body;

    // Generate a password
    const resetToken = generateResetToken();

    // Send a password reset email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email address
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You have requested a password reset. Click the link below to reset your password:</p>
        <a href="http://frontend-url/reset-password?token=${resetToken}">Reset Password</a>
      `,
    });

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


function generateResetToken() {
  // Generate and return a secure token
   const token = crypto.randomBytes(32).toString('hex');
   return token;
}

