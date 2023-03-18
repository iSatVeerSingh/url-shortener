import nodemailer from 'nodemailer';

const verificationMail = async (email, subject, msg) => {
  const { SENDER_EMAIL, MAIL_PASSWORD } = process.env;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: SENDER_EMAIL,
      pass: MAIL_PASSWORD,
    },
  });

  const mailInfo = await transporter.sendMail({
    from: SENDER_EMAIL,
    to: email,
    subject,
    html: msg,
  });

  return mailInfo;
};

export default async (email, data, type) => {
  const { HOST } = process.env;

  let msg;
  let subject;

  if (type === 'signup') {
    const link = `http://${HOST}/signup/verify?token=${data}`;
    msg = `<h2>Email Verification</h2>
    <p>Click on the link to verify you email</p>
    <a href="${link}" target="_blank">${link}</a>`;
    subject = 'New User Email Verification';
  } else if (type === 'clickVerification') {
    const link = `http://${HOST}/${data.urlId}/verify?token=${data.jwtToken}`;
    msg = `<h2>Link Click Verification</h2>
    <p>Click on the link to verify your click</p>
    <a href="${link}" target="_blank">${link}}</a>`;
    subject = 'Link Click Verification';
  } else {
    msg = `<h2>New click on link</h2>
    <p>${data.name} has clicked on your link</p>`;
    subject = 'New click on link';
  }

  return verificationMail(email, subject, msg);
};
