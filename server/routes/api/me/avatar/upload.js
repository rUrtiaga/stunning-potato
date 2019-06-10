const Users = require('mongoose').model('Users')

module.exports = function (req, res, next) {
    const id = req.userId;
    const path = req.file.path
    console.log(path)

    Users.findById(id).then(user => {
        user.updateAvatar(path)
        user.save()
        return user
    }).then(r => {
        res.status(201).send("avatar upload success");
    }).catch(e => {
        next(e);
    })

    // Users.findByIdAndUpdate(id, {
    //     'avatar': path
    // }).then(r => {
    //     console.log(r)
    //     res.sendStatus(201);
    // }).catch(e => {
    //     next(e);
    // })
}