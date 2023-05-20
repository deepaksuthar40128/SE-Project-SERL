const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASS,
    },
});

module.exports.sendResetEmail = async (email, token) => {
    var url = "http://localhost/reset-password?token=" + token;

    await smtpTransport.sendMail({
        from: "SERL LAB",
        to: email,
        subject: "RESET YOUR PASSWORD",
        text: `Click on this link to reset your password ${url}`,
        html: `<h3> Click on this link to reset your password : ${url} </h3>`,
    });
};
