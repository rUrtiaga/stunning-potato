const Searchs = require('mongoose').model("Searches_pet")
const fs = require('fs')

module.exports = function (req, res, next) {
    id_search = req.params.id
    Searchs.obtainPrincipalPicDir(id_search)
        .then(dir => {
            if (!fs.existsSync(dir)) {
                throw Error("no image")
            }
            res.sendFile(dir, {
                root: '.'
            })
        }).catch(e => next(e))
}