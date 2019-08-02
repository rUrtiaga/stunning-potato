const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = function (req, res) {
    return Users.findByIdAndUpdate(req.userId, req.body, (err) => {
        if (err) return res.status(500).send({
            e: err
        });
        return res.sendStatus(200)
    })
}