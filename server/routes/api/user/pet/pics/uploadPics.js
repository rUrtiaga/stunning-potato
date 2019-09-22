const Users = require('mongoose').model('Users')

module.exports = function (req, res, next) {
    const id = req.userId;
    const id_pet = req.params.id_pet
    let pics_filenames = []

    //Check principal image
    if (req.files['principal'].length == 0) {
        throw "no principal pic"
    }
    const principal_filename = req.files['principal'][0].filename;

    //check new extra pics
    if (req.files['pics'] && req.files['pics'].length > 0) {
        pics_filenames = req.files['pics'].map(f => f.filename);
    }


    Users.findById(id).then(user => {
        if (!user) {
            res.sendStatus(400)
        }
        pet = user.pets.id(id_pet)
        pet.setPrincipalPic(principal_filename);
        if (pics_filenames.length > 0) {
            pet.setPics(pics_filenames)
        }
        user.save()
        return "OK"
    }).then(r => {
        res.status(201).send(r);
    }).catch(e => {
        next(e);
    })
}