const config = require('./config.js');
module.exports.jwt_token = function () {
    return config.JWT_TOKEN;
}