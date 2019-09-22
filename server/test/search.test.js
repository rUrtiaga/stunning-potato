const aux = require("./axios_functions")
const axios = require("./axiosConnection")
var user_loged;

describe("Search", () => {

    beforeAll(async () => {
        let res = await axios.post("/auth/login/", {
            "user": {
                "email": "mail25@lito.com",
                "password": "1234"
            }
        })
        user_loged = res.data.user
        axios.defaults.headers.common['authorization'] = user_loged.token

        //Cargo las mascotas y las busquedas
        user_loged.pets_ids = await aux.loadExamplePetsWithSerchs(axios, user_loged._id)
    })

    afterAll(async () => {
        await aux.removePets(axios, user_loged)
    })

    test("lostpets query with location", async done => {

        let res = await axios.get("/lostpets", {
            params: {
                lat: -35.522620524394135,
                long: -58.30532461073403
            }
        })
        expect(res.data.length).toEqual(2)
        done()
    });

    //TODO
    test("delete search for particular pet", async done => {
        let pets = await aux.obtainPetsFromId(axios, user_loged._id)
        console.log(pets)

        done()
    })
});