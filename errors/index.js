const { constants } = require('http2');

function handleWrongCredentials(res, customMessage) {
  return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({ message: customMessage });
}

function handleRouteError(err, res) {
  return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Page Not Found' });
}

function handleAccessDenied(res) {
  return res.status(constants.HTTP_STATUS_FORBIDDEN).send({ message: 'Access Denied' });
}

function handleEmailIsRegisteredError(res) {
  return res.status(constants.HTTP_STATUS_CONFLICT).send({ message: 'Email is Already Registered' });
}

module.exports = {
  handleRouteError,
  handleWrongCredentials,
  handleAccessDenied,
  handleEmailIsRegisteredError,
};
