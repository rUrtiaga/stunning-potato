const Users = require('mongoose').model('Users')

module.exports = function (req, res, next) {
    const id = req.userId;
    const path = req.file.path

    Users.findById(id).then(user => {
        if (!user) {
            res.sendStatus(400)
        }
        // user.updateAvatar(path)
        user.setAvatar(true)
        user.save()
        return user
    }).then(r => {
        res.status(201).send("avatar upload success");
    }).catch(e => {
        next(e);
    })
}