const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

var PetsSchema = new Schema({
    name: String,
    species: String,
    age: String,
    search: {
        type: Schema.Types.ObjectId,
        ref: 'Search_pet'
    }
    // pics:[String]
}, {
    timestamps: true
})


PetsSchema.method.updateSearch = function (id_search) {
    this.search = id_search
    return this.save()
}


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
        type: Date
        // ,
        // required: true
    }

    // pics:[String]
}, {
    timestamps: true
})


mongoose.model('Pets', PetsSchema);
mongoose.model('Searches_pet', SearchesSchema);


module.exports = PetsSchema