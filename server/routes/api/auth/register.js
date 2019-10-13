const mongoose = require("mongoose")
const Users = mongoose.model("Users")

module.exports = async function(req, res) {
    const {
        body: { user }
    } = req

    //validations
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: "is required"
            }
        })
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: "is required"
            }
        })
    }

    if (await Users.isRegistered(user.email)) {
        return res.status(409).json({
            errors: {
                email: "already registered"
            }
        })
    }

    Users.newUser(user)
        .then(auth => res.status(201).json(auth))
        .catch(e => next(e))
}
