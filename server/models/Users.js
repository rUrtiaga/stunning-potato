const mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
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

class Person {
    //Authentification

    setPassword(password) {
        this.password = bcrypt.hashSync(password, 8);
    };

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password)
    };

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, jwt_key);
    }

    toAuthJSON() {
        return {
            _id: this._id,
            email: this.email,
            token: this.generateJWT(),
        };
    };

    //Others

    addPet(pet) {
        let lenght = this.pets.push(pet)
        return this.pets[lenght - 1]._id
    };

    petsForClient() {
        return this.pets
    }

    setAvatar(bool) {
        this.avatar = bool;
    };

    findPetForClient(id_pet) {
        return this.pets.id(id_pet)
    }
}

UsersSchema.loadClass(Person)

mongoose.model('Users', UsersSchema);