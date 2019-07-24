const Users = require('mongoose').model('Users')
const Pets = require('mongoose').model('Pets')
const fs = require('fs')

module.exports = function (req, res, next) {
    const id = req.userId;
    const id_pet = req.params.id_pet
    const id_pic = req.params.id_pic

    Users.findById(id).then(async user => {
        res.sendFile(user.pets.id(id_pet).getDirPic(id_pic), {
            root: '.'
        })
    })
}