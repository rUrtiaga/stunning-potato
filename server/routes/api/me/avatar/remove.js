const fs = require('fs');
const Users = require('mongoose').model("Users");

module.exports = async function (req, res, next) {
    const id = req.userId
    const dir = `./uploads/${id}/avatar`
    // if (!fs.existsSync(dir)) {
    //     next("this avatar don't exist")
    // }
    fs.unlinkSync(dir)
    await Users.findOneAndUpdate(id, {
        avatar: false
    })
    res.sendStatus(200)

}