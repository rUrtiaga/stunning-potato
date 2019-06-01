async function obtainPetsFromId(axios, id) {
    let res = await axios.get(`/users/${id}/pets`)
    return res.data
}

async function loadPet(axios, id_user_loged, pet) {
    let res = await axios.post(`/users/${id_user_loged}/pets/`, {
        pet
    })
    return res.data.id
}

async function newSearch(axios, id_user_loged, id_pet, location, date) {
    let res = await axios
        .post(`/users/${id_user_loged}/pets/${id_pet}/search`, {
            location,
            date
        })
    return res.data
}

async function loadExamplePets(axios, id_user_loged) {
    if (!axios || !id_user_loged) {
        throw new Error("invalid user or no client http")
    }
    let pets = [{
        species: "dog",
        sex: "female",
        age: "young",
        name: "Chipolin"
    }, {
        species: "cat",
        sex: "male",
        age: "old",
        name: "cachi"
    }, {
        species: "dog",
        sex: "male",
        age: "young",
        name: "pichi"
    }]

    return await Promise.all(pets.map(async pet => await loadPet(axios, id_user_loged, pet)));
}

async function loadExamplePetsWithSerchs(axios, id_user_loged) {
    let list_pets_ids = await loadExamplePets(axios, id_user_loged);
    let locations = [{
        type: "Point",
        coordinates: [
            -35.51186191595345,
            -58.31545263197427
        ]
    }, {
        type: "Point",
        coordinates: [
            -35.522620524394135,
            -58.30532461073403
        ]
    }, {
        type: "Point",
        coordinates: [
            -35.3655796275494,
            -58.25041355546523
        ]
    }]

    for (let index = 0; index < list_pets_ids.length; index++) {
        await newSearch(axios, id_user_loged, list_pets_ids[index], locations[index], new Date())
    }
    return list_pets_ids
}

function removePets(axios, user_data) {
    return axios.delete(`/users/${user_data._id}/pets/`, {
        data: user_data.pets_ids,
    })
}

module.exports = {
    removePets,
    loadExamplePets,
    obtainPetsFromId,
    loadPet,
    loadExamplePetsWithSerchs
}