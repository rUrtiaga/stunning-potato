fs = require('fs')

module.exports = function (req, res) {
    // const id = req.userId;
    const dir = `./uploads/${req.userId}/avatar`

    if (!fs.existsSync(dir)) {
        throw Error("no avatar")
    }
    res.sendFile(dir, {
        root: '.'
    })

}