const petRouter = require('express').Router();
const auth = require('../../auth')

petRouter.route("/:id/search")
    .get(require("./search"))

petRouter.route("/:id/contact")
    .get(auth.required, require("./contact"))

module.exports = petRouter;