const Users = require("mongoose").model("Users")
const Pets = require("mongoose").model("Pets")
const fs = require("fs")

module.exports = function(req, res, next) {
    const id = req.userId
    const id_pet = req.params.id_pet

    Users.findById(id)
        .then(async user => {
            let pet = user.pets.id(id_pet)
            return pet.getAllPics()
        })
        .then(r => {
            //TODO que envie los archivos y no los nombres
            res.status(200).send(r)
        })
        .catch(e => {
            next(e)
        })
}
