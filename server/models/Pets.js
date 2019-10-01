const mongoose = require("mongoose")
const Searchs = mongoose.model("Searches_pet")
const fs = require("fs")
const { Schema } = mongoose

let PetsSchema = new Schema(
    {
        name: String,
        species: String,
        age: String,
        search: {
            type: Schema.Types.ObjectId,
            ref: "Search_pet"
        },
        //lista con los nombres de los archivos de el resto de las fotos
        pics: [String],
        //nombre del archivo de la foto principal
        principalPic: String
    },
    {
        timestamps: true
    }
)

class Pet {
    /**
     * Metodos de clase
     */
    //obtiene el path de la foto principal dado el id de una mascota
    static async getPrincipalPicLocation(id) {
        let user
        let pet
        try {
            user = await Users.findOne({
                "pets._id": id
            })
            pet = user.pets.id(id)
        } catch (error) {
            throw "unable to find this pet"
        }
        return pet.principalPicDir()
    }

    /**
     * Metodos de instancia
     */

    //estructura de carpetas donde se encuentran los diferentes archivos de la mascota actual
    picsDir() {
        return `./uploads/${this.parent().id}/${this.id}/`
    }

    //obtiene el path de un determinado archivo, si no esta lanza un error
    getDirPic(pic_name) {
        if (
            !this.principalPic == pic_name ||
            this.pics.some(pn => pn == pic_name)
        ) {
            throw "pic name not found for this pet"
        }
        return this.picsDir() + pic_name
    }

    //obtiene el path de la foto principal de la mascota
    principalPicDir() {
        return this.getDirPic(this.principalPic)
    }

    //asigna el archivo para la foto principal, y borra la foto principal anterior
    setPrincipalPic(fileName) {
        if (this.principalPic) {
            this.deleteImagePet(this.principalPic)
        }
        this.principalPic = fileName
        //Si posee un search actualizo la fotografia
        if (this.search) {
            Searchs.updatePrincipalPic(this.search, this.principalPicDir())
        }
    }

    //devuelve el nombre de todos los archivos que posee esta mascota
    getAllPics() {
        return {
            principal: this.principalPic,
            pics: this.pics
        }
    }

    //setea la lista de archivos como la lista de picks, y borra las anteriores
    setPics(fileNames) {
        if (this.pics.length > 0) {
            this.deleteImagesPet(this.pics)
        }
        this.pics = fileNames
    }

    deleteImagePet(fileName) {
        let dir = this.picsDir()
        //Borro el archivo
        fs.unlinkSync(dir + fileName)
        //Si esta la carpeta vacia la borro
        if (fs.readdirSync(dir) == 0) {
            fs.rmdirSync(dir)
        }
    }

    deleteImagesPet(arrayFilesNames) {
        arrayFilesNames.forEach(fileName => {
            this.deleteImagePet(fileName)
        })
    }

    //borra el archivo, si es que le corresponde a esta mascota
    removePic(id_pic) {
        this.deleteImagePet(id_pic)
        if (this.principalPic == id_pic) {
            this.removePrincipalPic()
            return true
        }
        if (this.pics.length == 0) {
            throw "pic reference not found"
        }
        let indexInPics = this.pics.findIndex(f => f == id_pic)
        if (indexInPics != -1) {
            this.pics.splice(indexInPics)
        }
    }

    //Interno, borra la referencia en otros lugares de la foto principal de la mascota
    removePrincipalPic() {
        // borro la referencia a la imagen actual
        this.principalPic = null
        //borro la refencia a la imagen en los demas lugares
        Searchs.updatePrincipalPic(this.search, null)
    }

    //Borra la busqueda de la mascota actual, hay que pasarle el usuario
    async deleteSearch(user) {
        try {
            await Searchs.findByIdAndDelete(this.search)
        } catch (error) {
            console.log(error)
        }
        this.search = null
        if (user) {
            await user.save()
        }
    }

    //Borra todas las imagenes guardadas
    deleteAllImages() {
        this.deleteImagesPet(this.pics.concat([this.principalPic]))
    }

    preRemove() {
        try {
            this.deleteAllImages()
        } catch (error) {
            console.log("error borrando imagenes", error)
        }
        Searchs.removeWithId(this.search)
    }
}

PetsSchema.loadClass(Pet)

// //Agrega una función middleware antes de remover una mascota
//  //NO FUNCIONA si es un subdocument.
// PetsSchema.pre("remove", function(next) {
//     //remuevo las imagenes
//     console.log("****** antes de borrar")
//     this.deleteAllImages()
//     //remuevo la busqueda
//     Searchs.remove({ _id: this.search }).exec()
//     next()
// })

mongoose.model("Pets", PetsSchema)
module.exports = PetsSchema
