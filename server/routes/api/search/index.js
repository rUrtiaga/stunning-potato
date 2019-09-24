const searchRouter = require('express').Router();

searchRouter.route("/:id/pic")
    .get(require("./obtainPrincipalPic"))

module.exports = searchRouter;