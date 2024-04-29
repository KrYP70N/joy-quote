import nodemailer from 'nodemailer'

export const mailTo = (email: string, subject: string, content: string) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aiden.htut@gmail.com',
      pass: 'rwnn ukos tfyq rmbg',
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  // Send an email
  const mailOptions = {
    from: 'aiden.htut@gmail.com',
    to: email,
    subject: subject,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}