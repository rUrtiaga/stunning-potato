const axios_lib = require("axios");
const fs = require("fs");
const FormData = require("form-data");

//Ejecutar estos test en una base de datos con un usuario (auth.test.js crea uno)
let user_loged;

const axios = axios_lib.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000
});

describe("Users", () => {
  beforeAll(async () => {
    let res = await axios.post("/auth/login/", {
      user: {
        email: "mail25@lito.com",
        password: "1234"
      }
    });
    user_loged = res.data.user;
    axios.defaults.headers.common["authorization"] = user_loged.token;
  });

  describe("User update", () => {
    test("obtain user data", done => {
      axios.get("/me").then(r => {
        expect(r).toEqual(expect.objectContaining({
          status: 200
        }));
        expect(r.data.user).toEqual(expect.objectContaining({
          email: 'mail25@lito.com'
        }));
        done();
      })
    })
    test("update name", done => {
      axios.put("/me", {
        name: "Cuarto"
      }).then(r => {
        expect(r).toEqual(expect.objectContaining({
          status: 200
        }));
        done()
      })
    })
  })

  describe("Avatar image", () => {
    test("upload image", done => {
      path = __dirname + "/1.png";

      file = fs.createReadStream(path);
      form = new FormData();
      form.append("avatar", file);

      axios
        .post("/me/avatar", form, {
          headers: {
            "content-type": `multipart/form-data; boundary=${form._boundary}`
          }
        })
        .then(r => {
          //check upload
          axios.get("/me/avatar/").then(res => {
            expect(res).toEqual(expect.objectContaining({
              status: 200
            }));
            done();
          });
        })
        .catch(e => {
          fail("ocurrió un error");
        });
    });
  });
});