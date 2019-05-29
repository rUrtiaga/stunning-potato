const axios_lib = require("axios");

//Ejecutar estos test en una base de datos vacia
let user_loged;

const axios = axios_lib.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 1000
})

describe("JWT", () => {

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

    test("create user", done => {
        user = {
            name: "segundo",
            last_name: "primero",
            pic: "",
            email: "primero3@a.com",
            cellphone: "123123",
            address: "123",
            password: "secretpassword"
        }
        console.log(token)
        return axios
            .post("/register/", {
                user
            })
            .then(r => {
                expect(r.status).toBe(201);
                done();
            })
            .catch(e => {
                console.log(e);
            });
    });
})