const jwt = require('jsonwebtoken');

const { ResponseError } = require('../error/response-error.js');

module.exports = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token === undefined) {
    throw new ResponseError(401, 'token not found!');
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, 'sendbylovsecret', (err, decoded) => {
      if (err) {
        // throw new ResponseError(401, err);
        res.status(401).send({
          message: 'Token Expired',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    throw new ResponseError(401, 'please login!');
  }
};
