const axios = require("axios");

describe("JWT", () => {
    test("create user", done => {
        user = {
            name: "segundo",
            last_name: "primero",
            pic: "",
            email: "primero@a.com",
            cellphone: "123123",
            address: "123",
            password: "secretpassword"
        }

        return axios
            .post("http://localhost:3000/api/register/", user)
            .then(r => {
                expect(r.status).toBe(201);
                done();
            })
            .catch(e => {
                console.log(e);
            });
    });
})