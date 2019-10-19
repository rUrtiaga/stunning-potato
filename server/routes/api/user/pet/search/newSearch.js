var mongoose = require("mongoose")

const Users = mongoose.model("Users")
const Searchs = mongoose.model("Searches_pet")

module.exports = function(req, res) {
    const id_pet = req.params.id_pet

    //Como la mascota depende del user, y es responsabilidad de la
    // mascota crear el Search se debe acceder desde el User
    Users.newSearch(id_pet, req.body.location, req.body.date)
        .then(id =>
            res.status(201).json({
                id
            })
        )
        .catch(e => {
            res.status(500).json(e)
        })
}
