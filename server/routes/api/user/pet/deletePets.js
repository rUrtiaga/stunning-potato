const Users = require("mongoose").model("Users")

module.exports = function(req, res, next) {
    Users.findById(req.params.id).then(async user => {
        if (!user) {
            return res.sendStatus(400)
        }

        pets_ids = req.params.id_pet ? [req.params.id_pet] : req.body
        try {
            await pets_ids.forEach(async id => {
                let pet = await user.pets.id(id)
                try {
                    pet.preRemove()
                } catch (error) {
                    console.log(error)
                }
                await pet.remove()
            })
            await user.save()
        } catch (error) {
            next(error)
        }
        res.sendStatus(200)
    })
}
