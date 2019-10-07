const mongoose = require("mongoose")

const Users = mongoose.model("Users")

module.exports = function(req, res, next) {
    Users.findPetByIdPet(req.params.id)
        .then(r => res.status(200).json(r))
        .catch(e => next(e))
}
