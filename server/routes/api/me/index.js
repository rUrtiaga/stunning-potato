meRouter = require('express').Router();
auth = require("../../auth");

meRouter.route("/")
    .get(auth.required, require('./me'))

module.exports = meRouter;