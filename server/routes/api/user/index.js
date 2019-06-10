const userRouter = require('express').Router()
const auth = require('../../auth')

const deletePets = require("./pet/deletePets");

userRouter.all("/:id/*", auth.required, auth.checkIdentity)

//Pets
userRouter.route("/:id/pets")
    .post(require("./pet/newPet"))
    .get(require("./pet/obtainPets"))
    .delete(deletePets)

userRouter.route("/:id/pets/:id_pet")
    .delete(deletePets)

userRouter.route("/:id/pets/:id_pet/search")
    .post(require("./pet/search/newSearch"))
    .delete(require("./pet/search/removeSearch"))



module.exports = userRouter