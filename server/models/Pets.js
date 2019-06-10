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

PetsSchema.methods.deleteSearch = async function (user) {
    try {
        await Searchs.findByIdAndDelete(this.search);
    } catch (error) {
        console.log(error)
    }
    this.search = null;
    if (user) {
        await user.save()
    }
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


mongoose.model('Pets', PetsSchema);
Searchs = mongoose.model('Searches_pet', SearchesSchema);


module.exports = PetsSchema