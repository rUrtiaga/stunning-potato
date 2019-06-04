const Users = require('mongoose').model('Users')

module.exports = function (req, res, next) {
    Users.findById(req.params.id)
        .then(async user => {
            if (!user) {
                return res.sendStatus(400);
            }

            pets_ids = (req.params.id_pet) ? [req.params.id_pet] : req.body
            try {
                await pets_ids.forEach(async id => {
                    let pet = await user.pets.id(id);
                    await pet.deleteSearch()
                });
                await pets_ids.forEach(async id => {
                    await user.pets.pull({
                        _id: id
                    })
                })
                await user.save();
            } catch (error) {
                next(error)
                // console.log(error)
                // res.sendStatus(500)
            }
            res.sendStatus(200)
        })
}