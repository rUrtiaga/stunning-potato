const mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
// var crypto = require('crypto');
const jwt = require('jsonwebtoken');
var {
    jwt_token
} = require("../jwt_token")
var jwt_key = jwt_token();

const {
    Schema
} = mongoose;
const PetsSchema = require("./Pets");

var UsersSchema = new Schema({
    name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    pets: [PetsSchema],
    avatar: Boolean
}, {
    timestamps: true
})


UsersSchema.methods.setPassword = function (password) {
    this.password = bcrypt.hashSync(password, 8);
};

UsersSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

UsersSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, jwt_key);
}

UsersSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

UsersSchema.methods.addPet = function (pet) {
    let lenght = this.pets.push(pet)
    return this.pets[lenght - 1]._id
};

UsersSchema.methods.usersForClient = function () {
    //TODO    
}

UsersSchema.methods.petsForClient = function () {
    return this.pets
}


UsersSchema.methods.updateAvatar = function (path) {
    this.avatar = true;
};

// UsersSchema.methods.toProfileUser = function () {
//     return {
//         _id: this._id,
//         email: this.email,
//     };
// };

mongoose.model('Users', UsersSchema);