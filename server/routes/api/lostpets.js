const Searchs = require('mongoose').model("Searches_pet")

//con geowith 
// Searchs.find({
//     location: {
//         $geoWithin: {
//             $centerSphere: [
//                 [location.lat, location.long], 3.1 / 3963.2
//             ]
//         }
//     }
// })

module.exports = function (req, res, next) {
    location = req.query
    Searchs.aggregate([{
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: [parseFloat(location.lat), parseFloat(location.long)]
                    },
                    spherical: true,
                    maxDistance: 5000,
                    distanceField: "distance",
                    distanceMultiplier: 0.001
                }

            },
            {
                $project: {
                    name: 1,
                    age: 1,
                    species: 1,
                    location: {
                        coordinates: 1
                    },
                    date: 1,
                    distance: 1
                }
            }
        ])
        .then(list_serchs => {
            res.json(list_serchs);
        }).catch(e => console.log(e))
}