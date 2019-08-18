const authRouter = require('express').Router()

authRouter.route("/register").post(require("./register"))
authRouter.route("/login").post(require("./login"))
authRouter.route("/forgot").post(
    require("./restorePass/userExist"),
    require("./restorePass/forgot"),
    require("./restorePass/sendMail"),
    (req, res) => res.status(200).send("Mail enviado"))
authRouter.route("/restore").post(require("./restorePass/userExist"),
    require("./restorePass/changePass")
)

module.exports = authRouter