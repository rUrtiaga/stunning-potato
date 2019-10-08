const Users = require("mongoose").model("Users")

module.exports = async function(req, res, next) {
    //envia el archivo que obtiene la path mediante el user
    res.sendFile(
        await Users.obtainFilePathFromIdPet(req.params.id, req.params.namePic),
        {
            root: "."
        }
    )
}
