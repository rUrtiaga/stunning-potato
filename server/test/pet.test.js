const axios_lib = require("axios");
const fs = require("fs");
const FormData = require("form-data");

//Ejecutar estos test en una base de datos vacia
let user_loged;
let pet_id;

const axios = axios_lib.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 1000
})


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


    test("create pet", done => {
        let pet = {
            species: "dog",
            sex: "female",
            age: "young",
            name: "Chipolin"
        }

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

    test("create search", async done => {
        // petsFromUser = await obtainPetsFromId(user_loged._id)
        // idPet = petsFromUser[0]._id

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

    afterAll(async () => {
        await axios.delete(`/users/${user_loged._id}/pets/${pet_id}`)
    })
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
            // console.log(form)
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

                    // expect(await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics/${response.data.principal}`).data).toBe(file)
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
            // console.log(form)
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
                    expect(await axios.get(`/users/${user_loged._id}/pets/${pet_id}/pics/${response.data.principal}`) == file)
                    done()

                })
                .catch(e => {
                    console.log(e)
                    fail("ocurrió un error");
                });

        })

    })
})