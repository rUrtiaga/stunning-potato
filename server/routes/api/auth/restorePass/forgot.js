const mongoose = require('mongoose')
const Users = mongoose.model("Users");
const bcrypt = require('bcryptjs');

module.exports = async function (req, res, next) {
    const user = (await Users.getUserByEmail(req.body.email))[0]
    //guardado de token y fecha de expiracion (2 dias)
    try {
        user.pass_reset = {
            token: await bcrypt.genSalt(3),
            expiration_date: Date.now() + 2 * 3600000
        }
        await user.save()
    } catch (error) {
        error.status = 400
        error.msj = "error en generación del token para restaurar contraseña"
        next(error)
    }
    req.token = user.pass_reset.token
    next()
}