const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = async function (req, res, next) {
    //TODO check password
    let user = (await Users.getUserByEmail(req.body.email))[0]
    try {
        if (!req.body.token || !user.isSameResetPassToken(req.body.token)) {
            throw new Error("error validando token")
        }
        if (!req.body.password) {
            throw new Error("error password no puede ser vacio")
        }
        user.setPassword(req.body.password)
        user.removeToken()
        await user.save()
        res.status(200).send("OK")
    } catch (error) {
        next(error)
    }

}