const mongoose = require('mongoose')
const Users = mongoose.model("Users");

module.exports = function (req, res) {
    const {
        body: {
            user
        }
    } = req;
    //validations
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: "is required"
            }
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: "is required"
            }
        });
    }

    // const finalUser = new Users(user);
    Users.create(user)
        .then(newUser => {
            newUser.setPassword(user.password);
            newUser.save();
            return newUser;
        })
        .then(newUser => {
            res.status(201).json({
                user: newUser.toAuthJSON()
            });
        })
        .catch(err => {
            if (err.code == 11000) {
                res.status(422).json({
                    errors: {
                        message: "duplicated key for user",
                        error: {}
                    }
                });
            }
            next(err)
        });
}