const userRouter = require('express').Router()
const auth = require('../../auth')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        dir = `./uploads/${req.userId}/${req.params.id_pet}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now())
    }
})
var upload = multer({
    storage: storage
})

const deletePets = require("./pet/deletePets");

userRouter.all("/:id/*", auth.required, auth.checkIdentity)

//Pets
userRouter.route("/:id/pets")
    .post(require("./pet/newPet"))
    .get(require("./pet/obtainPets"))
    .delete(deletePets)

// userRouter.route("/:id/pets/:id")


userRouter.route("/:id/pets/:id_pet")
    .delete(deletePets)

//PICS
userRouter.route("/:id/pets/:id_pet/pics")
    .post(
        upload.fields([{
            name: 'principal',
            maxCount: 1
        }, {
            name: 'pics',
            maxCount: 4
        }]), require("./pet/pics/uploadPics"))
    .get(require("./pet/pics/obtainPics"))

userRouter.route("/:id/pets/:id_pet/pics/:id_pic")
    .delete(require("./pet/pics/removePic"))
    .get(require("./pet/pics/obtainPic"))

userRouter.route("/:id/pets/:id_pet/search")
    .post(require("./pet/search/newSearch"))
    .delete(require("./pet/search/removeSearch"))



module.exports = userRouter