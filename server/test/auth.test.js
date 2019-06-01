const axios_lib = require("axios");

//Ejecutar estos test en una base de datos vacia
let user_loged;

const axios = axios_lib.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 1000
})

describe("Auth", () => {

    test("create user", done => {
        user = {
            name: "segundo",
            last_name: "primero",
            pic: "",
            email: "mail25@lito.com",
            cellphone: "123123",
            address: "123",
            password: "1234"
        }
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

    describe("Bad Login", () => {
        test("usuario inexistente", async () => {
            let res;
            try {
                await axios.post("/login/", {
                    "user": {
                        "email": "mail20@lito.com",
                        "password": "1234"
                    }
                })
            } catch (error) {
                res = error
            }
            expect(res.response.status).toEqual(400)
            expect(res.response.data.errors).toEqual({
                'email or password': 'is invalid'
            })
        })
        test("user without password", async () => {
            let res;
            try {
                await axios.post("/login/", {
                    "user": {
                        "email": "mail20@lito.com"
                    }
                })
            } catch (error) {
                res = error
            }
            expect(res.response.status).toEqual(401)
            expect(res.response.data.errors).toEqual({
                'password': 'is required'
            })
        })
        test("user without email", async () => {
            let res;
            try {
                await axios.post("/login/", {
                    "user": {
                        "password": "1234"
                    }
                })
            } catch (error) {
                res = error
            }
            expect(res.response.status).toEqual(401)
            expect(res.response.data.errors).toEqual({
                'email': 'is required'
            })
        })
    })

    describe("Loged Request", () => {

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

        //Debe devolver los datos del usuario logeado
        test("Me", async () => {
            let res = await axios.get("/me/")

            expect(res.status).toBe(200);
            //Compruebo que me llegue un objeto usuario con datos
            expect(res.data).toEqual(
                expect.objectContaining({
                    user: expect.any(Object)
                })
            )
        })

    })
})