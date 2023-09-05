const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  auth: {
    user: process.env.nodemailer_email,
    pass: process.env.nodemailer_password,
  },
  host: "smtp.gmail.com",
  service: "gmail",
});

const mailer = async ({ subject, html, to, text }) => {
  await transport.sendMail({
    subject: subject || "testing yuhuu",
    html: html || "<h1> Send through api</h1>",
    to: to || "mrdwnqdry@gmail.com",
    text: text || "Deposit 100 bisa menang 1juta loh ridwan :)",
  });
};

module.exports = mailer;
