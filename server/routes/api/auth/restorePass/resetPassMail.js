const nodemailer = require("nodemailer")
let mailConfig = require("../../../../config").gmail
let transporter = nodemailer.createTransport(mailConfig);

module.exports = async function (email, token) {
    let link = `http://localhost:3000/restore?token=${token}`
    let message = {
        to: email,
        subject: 'Mascotas - Restaurar Contraseña',
        text: 'para restaurar haga click en el siguiente enlace ' + link,
        html: `<p>para restaurar haga click en el siguiente enlace ${link}</p>`
    };
    return transporter.sendMail(message)
}