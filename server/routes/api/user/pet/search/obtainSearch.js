var mongoose = require("mongoose");

const Users = mongoose.model("Users");
// const Searchs = mongoose.model("Searches_pet");

module.exports = function (req, res, next) {
    Users.findById(req.params.id)
        .then(async user => {
            if (!user) {
                return res.sendStatus(400);
            }
            return (await user.pets.id(req.params.id_pet)).search
        }).then(id_search => res.status(200).json(id_search))
        .catch(e => next(e))
}