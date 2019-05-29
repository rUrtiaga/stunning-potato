const axios_lib = require("axios");
const aux = require("./axios_functions")

var user_loged;

const axios = axios_lib.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 1000
})

//TODO make after all que borre
describe("Search", () => {

    beforeAll(async () => {
        let res = await axios.post("/login/", {
            "user": {
                "email": "mail25@lito.com",
                "password": "1234"
            }
        })
        user_loged = res.data.user
        axios.defaults.headers.common['authorization'] = user_loged.token
    })

    test("", async done => {
        await aux.loadExamplePetsWithSerchs(axios, user_loged._id)

    });

});