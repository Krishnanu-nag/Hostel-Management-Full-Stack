const nodemailer = require('nodemailer');

// Create a transporter object using your SMTP details
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email options
const mailOptions = {
  from: process.env.EMAIL,
  subject: 'important',
  text: 'This is the body of the email.' // You can also use html: '<h1>HTML Content</h1>'
};

// Loop through email addresses
for (let i = 1; i <= 1400; i++) {
  let studentId = i.toString().padStart(3, '0'); // Ensure 3-digit format like 001, 002...
  mailOptions.to = `22je${studentId}@iitism.ac.in`;

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error: ${error}`);
    }
    console.log(`Email sent to 22je${studentId}@iitism.ac.in: ${info.response}`);
  });
}
