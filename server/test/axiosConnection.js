const axios_lib = require("axios");
const config = require("../config")

module.exports = axios_lib.create({
    baseURL: `${config.SERVER_URL}:${config.PORT}/api/`,
    timeout: 1000
});