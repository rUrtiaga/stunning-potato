const passport = require("passport")

module.exports = function(req, res, next) {
  const user = req.body.user

  if (!user.email) {
    return res.status(401).json({
      errors: {
        email: "is required"
      }
    })
  }

  if (!user.password) {
    return res.status(401).json({
      errors: {
        password: "is required"
      }
    })
  }

  return passport.authenticate(
    "local",
    {
      session: false
    },
    (err, passportUser, info) => {
      if (err) {
        return next(err)
      }

      if (passportUser) {
        const user = passportUser
        user.token = passportUser.generateJWT()

        return res.json({
          user: user.toAuthJSON()
        })
      }
      res.status(400).json(info)
    }
  )(req, res, next)
}
