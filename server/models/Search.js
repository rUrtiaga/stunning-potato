const mongoose = require('mongoose');
const {
    SERVER_URL,
    PORT
} = require('../config');

const {
    Schema
} = mongoose;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

var SearchesSchema = new Schema({
    pet: {
        type: Schema.Types.ObjectId,
        ref: 'Users.pets'
    },
    name: String,
    species: String,
    age: String,
    location: pointSchema,
    date: {
        type: Date,
        required: true,
        min: '2019-03-20'
    },
    pics: [String],
    principalPicLocation: String
}, {
    timestamps: true
})

class Search {

    static updatePrincipalPic(id_search, dir) {
        this.findById(id_search).then(search => {
            search.principalPicLocation = dir
            return search.save()
        }).catch(e => {
            throw "No se pudo actualzar la direccion de la foto principal en search"
        })
    }

    static obtainPrincipalPicDir(id_search) {
        return this.findById(id_search).then(search => {
            if (!search) {
                throw Error("search not found")
            }
            if (!search.principalPicLocation) {
                throw Error("no image in this search")
            }
            return search.principalPicLocation
        }).catch(e => {
            throw Error("error encontrando el search")
        })
    }

    //recibe un objeto location con lat y long
    static obtainListOfSearchNearAtLocation(location) {
        return this.aggregate([{
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
                "$addFields": {
                    pic: {
                        "$cond": {
                            if: "$principalPicLocation",
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    age: 1,
                    species: 1,
                    pet: 1,
                    pic: 1,
                    date: 1,
                    distance: {
                        $round: ["$distance", 0]
                    }
                }
            },
            {
                "$addFields": {
                    picLink: {
                        "$cond": {
                            if: "$pic",
                            then: {
                                $concat: [SERVER_URL, ":", {
                                    $toString: PORT
                                }, "/api/searchs/", {
                                    $toString: "$_id"
                                }, "/pic"]
                            },
                            else: ""
                        }
                    }
                }
            }
        ])
    }

    static findByIdPet(id) {
        return this.findOne({
            pet: id
        }).select({
            pics: 1,
            pet: 1,
            name: 1,
            age: 1,
            species: 1,
            location: 1,
            date: 1
        })
    }
}


SearchesSchema.index({
    location: "2dsphere"
})

SearchesSchema.loadClass(Search)


mongoose.model('Searches_pet', SearchesSchema);