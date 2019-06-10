const Users = require('mongoose').model("Users")

module.exports = function (req, res) {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.sendStatus(400);
            }
            return user.petsForClient()
        })
        .then(pets => res.status(200).json(pets))
        .catch(e => res.sendStatus(500));
}