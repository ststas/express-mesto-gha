const http2 = require('http2');
const { default: mongoose } = require('mongoose');

const { constants } = http2;

function handleError(res, err) {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: err.message });
  }
  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Internal Server Error' });
}

function handleWrongCredentials(res, customMessage) {
  return res.status(constants.HTTP_STATUS_UNAUTHORIZED).send({ message: customMessage });
}

function handleRouteError(err, res) {
  return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Page not found' });
}

function handleAccessDenied(res) {
  return res.status(constants.HTTP_STATUS_FORBIDDEN).send({ message: 'Access Denied' });
}

function handleEmailIsRegisteredError(res) {
  return res.status(constants.HTTP_STATUS_CONFLICT).send({ message: 'Email is Already Registered' });
}

module.exports = {
  handleError,
  handleRouteError,
  handleWrongCredentials,
  handleAccessDenied,
  handleEmailIsRegisteredError,
};
