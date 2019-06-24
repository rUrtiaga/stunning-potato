const Users = require('mongoose').model('Users')

module.exports = function (req, res) {
    const pet = req.body.pet;

    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.sendStatus(400);
            }
            let id_newPet = user.addPet(pet);
            user.save();
            return id_newPet;
        })
        .then(id =>
            res.status(201).json({
                id
            })
        )
        .catch(e => res.status(500).json(e));
}