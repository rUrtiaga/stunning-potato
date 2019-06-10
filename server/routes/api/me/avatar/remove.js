const fs = require('fs');
const Users = require('mongoose').model("Users");

module.exports = async function (req, res) {
    const id = req.userId
    const dir = `./uploads/${id}/avatar`
    if (fs.existsSync(dir)) {
        fs.unlinkSync(dir)
        await Users.findByIdAndUpdate(id, {
                avatar: false
            },
            res.sendStatus(200))
    }
    res.sendStatus(400)
}