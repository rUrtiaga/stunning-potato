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
    },
    pics: [String],
    principalPic: String
}, {
    timestamps: true
})

class Pet {
    async deleteSearch(user) {
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
    setPrincipalPic(fileName) {
        if (this.principalPic) {
            this.deleteImagePet(this.principalPic)
        }
        this.principalPic = fileName;
    }

    setPics(fileNames) {
        if (this.pics.length > 0) {
            this.deleteImagesPet(this.pics)
        }
        this.pics = fileNames;
    }

    deleteImagePet(fileName) {
        const dir = `./uploads/${this.parent().id}/${this.id}/`
        fs.unlinkSync(dir + fileName)
    }

    deleteImagesPet(arrayFilesNames) {
        arrayFilesNames.forEach(fileName => {
            this.deleteImagePet(fileName);
        });
    }
}

PetsSchema.loadClass(Pet)

mongoose.model('Pets', PetsSchema);
module.exports = PetsSchema