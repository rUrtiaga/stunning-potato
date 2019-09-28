const Users = require("mongoose").model("Users")

module.exports = function(req, res, next) {
    const id = req.userId
    const id_pet = req.params.id_pet
    const id_pic = req.params.id_pic

    Users.findById(id)
        .then(user => {
            if (!user) {
                res.sendStatus(400)
            }
            pet = user.pets.id(id_pet)
            try {
                pet.removePic(id_pic)
            } catch (error) {
                error.msj = "no se pudo remover"
                throw error
            }
            user.save()
            return "Ok"
        })
        .then(r => {
            res.status(200).send(r)
        })
        .catch(e => {
            e.status = 400
            next(e)
        })
}
