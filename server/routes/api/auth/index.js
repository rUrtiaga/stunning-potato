const authRouter = require('express').Router()

authRouter.route("/register").post(require("./register"))
authRouter.route("/login").post(require("./login"))


module.exports = authRouter