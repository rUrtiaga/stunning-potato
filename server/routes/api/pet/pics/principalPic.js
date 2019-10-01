const mongoose = require("mongoose")

const Pets = mongoose.model("Pets")

module.exports = async function(req, res, next) {
    petId = req.params.id
    if (!petId) {
        next(new Error("no petID"))
    }
    console.log(petId)
    let picdir
    try {
        picdir = await Pets.getPrincipalPicLocation(petId)
        res.sendFile(picdir, {
            root: "."
        })
    } catch (error) {
        next(error)
    }
}
