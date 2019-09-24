const mongoose = require('mongoose');
const Searchs = mongoose.model("Searches_pet");
const fs = require('fs')
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
    picsDir() {
        return `./uploads/${this.parent().id}/${this.id}/`
    }

    getDirPic(pic_name) {
        if (!this.principalPic == pic_name || this.pics.some(pn => pn == pic_name)) {
            throw "pic name not found for this pet"
        }
        return this.picsDir() + pic_name
    }

    principalPicDir() {
        return this.getDirPic(this.principalPic)
    }

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
        //Si posee un search actualizo la fotografia
        if (this.search) {
            Searchs.updatePrincipalPic(this.search, this.principalPicDir())
        }
    }

    getAllPics() {
        return {
            principal: this.principalPic,
            pics: this.pics
        }
    }

    setPics(fileNames) {
        if (this.pics.length > 0) {
            this.deleteImagesPet(this.pics)
        }
        this.pics = fileNames;
    }

    deleteImagePet(fileName) {
        let dir = this.picsDir();
        fs.unlinkSync(dir + fileName)
        if (fs.readdirSync(dir) == 0) {
            fs.rmdirSync(dir)
        }
    }

    deleteImagesPet(arrayFilesNames) {
        arrayFilesNames.forEach(fileName => {
            this.deleteImagePet(fileName);
        });
    }

    removePic(id_pic) {
        this.deleteImagePet(id_pic);
        if (this.principalPic == id_pic) {
            this.principalPic = null;
            return true;
        }
        if (this.pics.length == 0) {
            throw "pic reference not found"
        }
        let indexInPics = this.pics.findIndex(f => f == id_pic);
        if (indexInPics != -1) {
            this.pics.splice(indexInPics)
        }
    }
}

PetsSchema.loadClass(Pet)

mongoose.model('Pets', PetsSchema);
module.exports = PetsSchema