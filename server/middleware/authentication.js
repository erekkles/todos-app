const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    let token = req.get('authorization');
    if(token && token.toLowerCase().startsWith('bearer')) token = token.split(" ")[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            return next();             
        } else {
            res.status(401).json({'message': 'invalid token'}).send();
        }
    });
};

module.exports = authentication;