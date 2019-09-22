const fs = require("fs");
const FormData = require("form-data");
const axios = require("./axiosConnection")

//Ejecutar estos test en una base de datos que tenga un usuario
let user_loged;
let pet = {
    species: "dog",
    sex: "female",
    age: "young",
    name: "TESTUUU"
}
let pet_id;


async function obtainPetsFromId(id) {
    let res = await axios.get(`/users/${id}/pets`)
    return res.data
}

describe("Pets", () => {

    beforeAll(async () => {
        let res = await axios.post("/auth/login/", {
            "user": {
                "email": "mail25@lito.com",
                "password": "1234"
            }
        })
        user_loged = res.data.user
        axios.defaults.headers.common['authorization'] = user_loged.token
    })

    afterAll(async () => {
        await removeAllImages();
        await axios.delete(`/users/${user_loged._id}/pets/${pet_id}`)
    })

    test("create pet", done => {
        return axios
            .post(`users/${user_loged._id}/pets`, {
                pet
            })
            .then(r => {
                expect(r.status).toBe(201);
                pet_id = r.data.id
                done();
            })
            .catch(e => {
                fail("ocurrió un error")
            });
    });

    test("d get pet", done => {
        return axios
            .get(`users/${user_loged._id}/pets/${pet_id}`)
            .then(r => {
                expect(r.status).toBe(200);
                expect(r.data.name).toBe(pet.name)
                done();
            })
            .catch(e => {
                fail(e)
            });
    });

    test("create search", async done => {
        let location = {
            "type": "Point",
            "coordinates": [
                -122.5,
                37.7
            ]
        }
        let date = "2019-05-01T00:00:00.000Z"

        return axios
            .post(`/users/${user_loged._id}/pets/${pet_id}/search`, {
                location,
                date
            })
            .then(r => {
                expect(r.status).toBe(201);
                done();
            })
            .catch(e => {
                fail("ocurrió un error")
            });
    });

    // test("remove particular pet with search", async done => {
    //     let r = await axios.delete(`/users/${user_loged._id}/pets/${pet_id}`)
    //     expect(r.status).toBe(200)
    //     done()
    // })

    describe("Pics", () => {
        test("upload principal", done => {
            path = __dirname + "/1.png";

            file = fs.createReadStream(path);
            form = new FormData();
            form.append("principal", file);
            axios
                .post(`/users/${user_loged._id}/pets/${pet_id}/pics`, form, {
                    headers: {
                        "content-type": `multipart/form-data; boundary=${form._boundary}`
                    }
                })
                .then(async r => {
                    //check upload
                    response = await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics`)
                    expect(await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics/${response.data.principal}`)).toEqual(expect.objectContaining({
                        status: 200,
                        statusText: "OK"
                    }))
                    done()
                })
                .catch(e => {
                    console.log(e)
                    fail("ocurrió un error");
                });

        })


        test("upload pics", done => {
            path = __dirname + "/1.png";

            file = fs.createReadStream(path);
            form = new FormData();
            form.append("principal", file);
            form.append("pics", file);
            form.append("pics", file);

            axios
                .post(`/users/${user_loged._id}/pets/${pet_id}/pics`, form, {
                    headers: {
                        "content-type": `multipart/form-data; boundary=${form._boundary}`
                    }
                })
                .then(async r => {
                    //check upload
                    response = await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics`)
                    expect(response.data.pics.length).toBe(2);
                    expect(await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics/${response.data.principal}`)).toEqual(expect.objectContaining({
                        status: 200,
                        statusText: "OK"
                    }))
                    done()

                })
                .catch(e => {
                    console.log(e)
                    fail("ocurrió un error");
                });

        })

    })
})

async function removeAllImages() {
    let imagesNames = await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics`)
    let proms = []
    let data = imagesNames.data
    if (data.principal) {
        proms.push(deleteImage(data.principal));
    }
    data.pics.forEach(name => {
        proms.push(deleteImage(name))
    });
    return Promise.all(proms)
}

async function deleteImage(imageName) {
    return axios.delete(`/users/${user_loged._id}/pets/${pet_id}/pics/${imageName}`)
}