const jwt = require('jsonwebtoken');
const { handleWrongCredentials } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(handleWrongCredentials(res, 'Authorization is required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-very-secret-key');
  } catch (err) {
    return next(handleWrongCredentials(res, 'Authorization is required'));
  }
  req.user = payload;
  return next();
};
