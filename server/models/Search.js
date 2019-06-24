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

SearchesSchema.index({
    location: "2dsphere"
})

mongoose.model('Searches_pet', SearchesSchema);