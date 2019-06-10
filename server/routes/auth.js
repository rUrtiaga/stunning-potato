var jwt = require('jsonwebtoken')
var {
    jwt_token
} = require('../jwt_token')
jwt_key = jwt_token();


function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });
    jwt.verify(token, jwt_key, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

function checkTokenId(req, res, next) {
    const id = req.params.id;

    if (!id)
        return res.status(403).send({
            auth: false,
            message: 'No token or id provided.'
        });
    if (req.userId !== id) {
        return res.status(403).send({
            auth: false,
            message: 'No rights for do this'
        });
    }
    next();

}

const auth = {
    required: verifyToken,
    checkIdentity: checkTokenId
};

module.exports = auth;