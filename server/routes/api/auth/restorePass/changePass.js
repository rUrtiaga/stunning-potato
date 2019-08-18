const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = async function (req, res, next) {
    //email, token, password
    //TODO check password
    let user = (await Users.getUserByEmail(req.body.email))[0]
    try {
        if (!user.isSameResetPassToken(req.body.token)) {
            throw new Error("error validando token")
        }
        user.setPassword(req.body.password)
        await user.save()
        res.status(200).send("OK")
    } catch (error) {
        next(error)
    }

}