const config = require('./config.json');
module.exports.jwt_token = function () {
    return process.env.JWT_TOKEN || config.JWT_TOKEN;
}