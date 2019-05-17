var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
const passport = require('passport');
var auth = require('./auth')

//Models
const Users = mongoose.model('Users');

router.route('/register').post(function (req, res) {
    const {
        body: {
            user
        }
    } = req;
    //validations
    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({
            user: finalUser.toAuthJSON()
        }));
})

router.route('/login').post(function (req, res, next) {
    const user = req.body.user;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {
        session: false
    }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({
                user: user.toAuthJSON()
            });
        }
        console.log(info)
        res.status(400).json(info)
    })(req, res, next);
});


router.route('/').get(function (req, res) {
    res.send('Hello World!');
});

//APARTIR DE ACá todos las request son protegidas
router.route('/me').get(auth.required, function (req, res) {
    const id = req.userId;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({
                user: user.toAuthJSON()
            });
        });

});

module.exports = router;