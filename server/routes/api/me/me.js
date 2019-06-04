const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = function (req, res) {
    const id = req.userId;

    return Users.findById(id, {
            name: 1,
            last_name: 1,
            email: 1
        })
        .then(user => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({
                user: user
            });
        })
        .catch(e => res.sendStatus(500).json(e));
}