const mongoose = require("mongoose")

const Users = mongoose.model("Users")

module.exports = async function(req, res, next) {
    //TODO guardar la informacion de los usuarios que van hacneidno click en contacto
    // userWhoRequestInfo = await Users.findById(req.userId)
    try {
        user = await Users.findByPetId(req.params.id)
    } catch (error) {
        error.status = 400
        error.msj = "null or invalid pet id"
        next(error)
    }
    res.status(200).json(user.getContactInfo())
}
