const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gandhimeet1389@gmail.com', 
    pass: 'dutu gprx rvgm sfss' 
  }
});

const sendEmail = async (event) => {
  const mailOptions = {
    from: 'gandhimeet1389@gmail.com',
    to: 'gandhimeet8187@gmail.com', // need to get call from user and get email from user table
    subject: `Task Event: ${event.eventType}`,
    text: `A task event occurred:\n\nUser ID: ${event.userId}\nTask ID: ${event.taskId}\nEvent Type: ${event.eventType}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
  } catch (error) {
        console.error(`Error sending email: ${error}`);
  }
};

module.exports = sendEmail;
