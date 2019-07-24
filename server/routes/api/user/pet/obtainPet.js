const Users = require('mongoose').model("Users")

module.exports = function (req, res) {
    return Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.sendStatus(404);
            }
            return user.findPetForClient(req.params.id_pet);
        })
        .then(pet => {
            if (!pet) {
                return res.sendStatus(404);
            }
            res.status(200).json(pet)
        })
        .catch(e => res.sendStatus(500));
}