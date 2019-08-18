const sendResetPassMail = require('./resetPassMail')

module.exports = async function (req, res, next) {
    try {
        await sendResetPassMail(req.body.email, req.token)
    } catch (error) {
        error.msj = "problema en el envio del mail"
        next(error)
    }
    next()
}