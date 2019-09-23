const Searchs = require('mongoose').model("Searches_pet")

module.exports = function (req, res, next) {
    location = req.query
    Searchs.obtainListOfSearchNearAtLocation(location)
        .then(list_serchs => {
            res.json(list_serchs);
        }).catch(e => next(e))
}