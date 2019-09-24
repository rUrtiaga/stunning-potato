apiRouter = require('express').Router();
auth = require("../auth");

apiRouter.use("/auth", require('./auth'))
apiRouter.use("/lostpets", require('./lostpets'))
apiRouter.use("/me", require('./me'))
apiRouter.use("/users", require('./user'))
apiRouter.use("/pets", require('./pet'))
apiRouter.use("/searchs", require('./search'))

module.exports = apiRouter;