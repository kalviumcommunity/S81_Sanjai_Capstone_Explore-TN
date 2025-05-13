const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use TLS
        auth: {
            user: process.env.SMTP_EMAIL, 
            pass: process.env.SMTP_PASSWORD, 
        },
    });

    await transporter.sendMail({
        from: `"Explore TN Support" <${process.env.SMTP_EMAIL}>`, 
        to: options.email,
        subject: options.subject,
        text: options.message,
    });
};

module.exports = { sendMail };
