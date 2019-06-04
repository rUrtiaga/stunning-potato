var mongoose = require("mongoose");

const Users = mongoose.model("Users");
const Searchs = mongoose.model("Searches_pet");

module.exports = function (req, res) {
    const id_user = req.params.id;
    const id_pet = req.params.id_pet;
    Users.findById(id_user)
        .then(async user => {
            if (!user) {
                return res.sendStatus(400);
            }
            //validate no pet

            let pet = await user.pets.id(id_pet);

            let pet_search = {
                pet: pet._id,
                name: pet.name,
                age: pet.age,
                species: pet.species,
                location: req.body.location,
                date: new Date(req.body.date)
            };

            //creo la busqueda
            let mongo_search = new Searchs(pet_search);

            //Elimina una busqueda anterior
            if (pet.search) {
                await Searchs.findByIdAndDelete(pet.search);
            }

            //guardo el id de la busqueda en la mascota
            pet.search = mongo_search.id;

            //hago efectivo los cambios en db
            await mongo_search.save();
            await user.save();
            return mongo_search._id;
        })
        .then(id =>
            res.status(201).json({
                id
            })
        )
        .catch(e => {
            console.log(e);
            res.status(500).json(e);
        });
}