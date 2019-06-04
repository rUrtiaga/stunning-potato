const Users = require('mongoose').model('Users')

module.exports = function (req, res) {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    Users.findById(id_user)
        .then(
            async user => {
                let pet = await user.pets.id(id_pet);
                return await pet.deleteSearch(user)
            }
        )
        .then(() => res.sendStatus(200))
        .catch(e => console.log(e))

}