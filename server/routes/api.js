var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const passport = require("passport");
var auth = require("./auth");

//Models
const Users = mongoose.model("Users");
const Searchs = mongoose.model("Searches_pet");

router.route("/register").post(function (req, res) {
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
        });

    // finalUser.setPassword(user.password);

    // return finalUser.save()
    //     .then(() => res.json({
    //         user: finalUser.toAuthJSON()
    //     }));
});

router.route("/login").post(function (req, res, next) {
    const user = req.body.user;

    if (!user.email) {
        return res.status(401).json({
            errors: {
                email: "is required"
            }
        });
    }

    if (!user.password) {
        return res.status(401).json({
            errors: {
                password: "is required"
            }
        });
    }

    return passport.authenticate(
        "local", {
            session: false
        },
        (err, passportUser, info) => {
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
            res.status(400).json(info);
        }
    )(req, res, next);
});

router.route("/").get(function (req, res) {
    res.send("Hello World!");
});

// router.route('/me').get(passport.authenticate('basic', {
//         session: false
//     }),
//     function (req, res) {
//         res.json({
//             id: req.user.id,
//             username: req.user.username
//         });
//     });
//APARTIR DE ACá todos las request son protegidas
router.route("/me").get(auth.required, function (req, res) {
    const id = req.userId;

    return Users.findById(id, {
            name: 1,
            last_name: 1,
            email: 1
        })
        .then(user => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({
                user: user
            });
        })
        .catch(e => res.sendStatus(500).json(e));
});

router
    .route("/users/:id/pets")
    .post(auth.required, auth.checkIdentity, function (req, res) {
        const pet = req.body.pet;
        Users.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.sendStatus(400);
                }
                let id_newPet = user.addPet(pet);
                user.save();
                return id_newPet;
            })
            .then(id =>
                res.status(201).json({
                    id
                })
            )
            .catch(e => res.status(500).json(e));
    })
    .get(auth.required, auth.checkIdentity, function (req, res) {
        Users.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.sendStatus(400);
                }
                // return user.petsForClient()
                return user;
            })
            .then(pets => res.status(200).json(pets))
            .catch(e => res.sendStatus(500));
    })
    .delete(auth.required, auth.checkIdentity, function (req, res) {
        Users.findById(req.params.id)
            .then(async user => {
                if (!user) {
                    return res.sendStatus(400);
                }
                pets_ids = req.body
                console.log(pets_ids)
                try {
                    await pets_ids.forEach(async id => {
                        let pet = await user.pets.id(id);
                        await pet.deleteSearch()
                    });
                    await pets_ids.forEach(async id => {
                        await user.pets.pull({
                            _id: id
                        })
                    })
                    await user.save();
                } catch (error) {
                    console.log(error)
                    res.sendStatus(500)
                }
                res.sendStatus(200)
            })
    });

router
    .route("/users/:id/pets/:id_pet/search")
    .post(auth.required, auth.checkIdentity, function (req, res) {
        const id_user = req.params.id;
        const id_pet = req.params.id_pet;
        Users.findById(id_user)
            .then(async user => {
                if (!user) {
                    return res.sendStatus(400);
                }
                //validate no pet

                let pet = await user.pets.id(id_pet);

                let pet_search = {
                    pet: pet._id,
                    name: pet.name,
                    age: pet.age,
                    species: pet.species,
                    location: req.body.location,
                    date: new Date(req.body.date)
                };

                //creo la busqueda
                let mongo_search = new Searchs(pet_search);

                //Elimina una busqueda anterior
                if (pet.search) {
                    await Searchs.findByIdAndDelete(pet.search);
                }

                //guardo el id de la busqueda en la mascota
                pet.search = mongo_search.id;

                //hago efectivo los cambios en db
                await mongo_search.save();
                await user.save();
                return mongo_search._id;
            })
            .then(id =>
                res.status(201).json({
                    id
                })
            )
            .catch(e => {
                console.log(e);
                res.status(500).json(e);
            });
    })
    .delete(auth.required, auth.checkIdentity, function (req, res) {
        const id_user = req.params.id;
        const id_pet = req.params.id_pet;
        Users.findById(id_user)
            .then(
                async user => {
                    let pet = await user.pets.id(id_pet);
                    return await pet.deleteSearch(user)
                }
            )
            .then(() => res.sendStatus(200))
            .catch(e => console.log(e))

    });

router.route("/lostpets").get(function (req, res, next) {
    console.log(req.query)
    location = req.query
    Searchs.find({
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [location.lat, location.long], 3.1 / 3963.2
                    ]
                }
            }
        })
        .select('name age species location.coordinates date')
        .then(list_serchs => {
            res.json(list_serchs);
        }).catch(e => console.log(e))
})

module.exports = router;