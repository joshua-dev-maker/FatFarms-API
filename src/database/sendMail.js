const nodemailer = require("nodemailer");

const sendMail = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "temitopejulius99@gmail.com",
        pass: "Fammieyjuliey",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: "temitopejulius99@gmail.com",
      ...config,
    });
    return `Preview URL: %s`, `${nodemailer.getTestMessageUrl(info)}`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };
