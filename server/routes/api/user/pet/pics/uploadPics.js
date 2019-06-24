const Users = require('mongoose').model('Users')

module.exports = function (req, res, next) {
    const id = req.userId;
    const id_pet = req.params.id_pet;
    const principal_filename = req.files['principal'][0].filename;
    const pics_filenames = req.files['pics'].map(f => f.filename);


    Users.findById(id).then(user => {
        if (!user) {
            res.sendStatus(400)
        }
        pet = user.pets.id(id_pet)
        pet.setPrincipalPic(principal_filename);
        pet.setPics(pics_filenames)
        user.save()
        return user
    }).then(r => {
        res.status(201).send(r);
    }).catch(e => {
        next(e);
    })
}