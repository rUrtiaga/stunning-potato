const mongoose = require("mongoose");

const Searchs = mongoose.model("Searches_pet");

module.exports = function (req, res, next) {
    Searchs.findByIdPet(req.params.id).then(
        r => res.status(200).json(r)
    ).catch(e => next(e))
}