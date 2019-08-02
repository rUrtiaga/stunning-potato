meRouter = require('express').Router();
auth = require("../../auth");
var multer = require('multer')
fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        dir = `./uploads/${req.userId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, "avatar")
    }
})
var upload = multer({
    storage: storage
})

meRouter.all('*', auth.required)

meRouter.route("/")
    .get(require('./me'))
    .put(require('./modifyUser'))

meRouter.route("/avatar")
    .post(
        upload.single('avatar'), require("./avatar/upload"))
    .get(require("./avatar/obtain"))
    .delete(require("./avatar/remove"))

module.exports = meRouter;