const petRouter = require("express").Router()
const auth = require("../../auth")

petRouter.route("/:id").get(require("./obtainPet"))

petRouter.route("/:id/search").get(require("./search"))

petRouter.route("/:id/pics/:namePic").get(require("./pics/obtainPic"))

petRouter.route("/:id/contact").get(auth.required, require("./contact"))

module.exports = petRouter
