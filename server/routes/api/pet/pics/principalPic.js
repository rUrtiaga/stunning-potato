const mongoose = require("mongoose");

const Pets = mongoose.model("Pets");

module.exports = async function (req, res, next) {
    petId = req.params.id
    // Pets.getPrincipalPicLocation(petId)
    let picdir = await Pets.getPrincipalPicLocation(petId)
    console.log(picdir)
    res.status(200).json(picdir)
    // try {
    //     user = await Users.findOne({
    //         "pets._id": req.params.id
    //     })
    // } catch (error) {
    //     error.status = 400
    //     error.msj = "null or invalid pet id"
    //     next(error)
    // }
    // res.status(200).json(user.getContactInfo());
}