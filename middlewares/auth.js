const jwt = require('jsonwebtoken');
const { handleWrongCredentials } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  // const { authorization } = req.headers;
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  if (!authorization) {
    return handleWrongCredentials(res, 'Authorization is required');
  }
  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'my-very-secret-key');
  } catch (err) {
    return handleWrongCredentials(res, 'Authorization is required');
  }

  req.user = payload;
  return next();
};
