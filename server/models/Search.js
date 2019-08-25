const mongoose = require('mongoose');

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
    pics: [String]
}, {
    timestamps: true
})

class Search {

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