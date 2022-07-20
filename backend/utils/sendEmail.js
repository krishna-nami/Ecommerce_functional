import nodeMailer from 'nodemailer';
const sendEmail = async (emaildata) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: true,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: emaildata.email,
    subject: emaildata.subject,
    text: emaildata.message,
  };
  await transporter.sendMail(mailOptions);
};
export default sendEmail;
