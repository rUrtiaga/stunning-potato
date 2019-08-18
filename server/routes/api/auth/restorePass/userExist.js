const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = function (req, res, next) {
    if (!req.body.email) {
        res.status(400).send("no mail provided");
    }
    if (!Users.isRegistered(req.body.email)) {
        res.status(404).send("Mail unregistered");
    }
    next();
}