meRouter = require('express').Router();
auth = require("../../auth");
var multer = require('multer')
var upload = multer({
    dest: 'uploads/users-avatars'
})


meRouter.route("/")
    .get(auth.required, require('./me'))

meRouter.route("/avatar")
    .post(auth.required, upload.single('avatar'), require("./avatar/upload"))

module.exports = meRouter;