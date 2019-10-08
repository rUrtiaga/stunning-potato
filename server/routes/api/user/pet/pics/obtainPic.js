const Users = require("mongoose").model("Users")

//deprecated?
module.exports = async function(req, res, next) {
    const id = req.userId
    const id_pet = req.params.id_pet
    const id_pic = req.params.id_pic

    //envia el archivo que obtiene la path mediante el user
    res.sendFile(await Users.obtainFilePath(id, id_pet, id_pic), {
        root: "."
    })
}
