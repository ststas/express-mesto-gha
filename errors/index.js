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
  return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
}

function handleUserNotFoundError(res, userId) {
  return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: `Invalid User ID: ${userId}. User ID must contain 24 symbols` });
}

function handleRouteError(req, res) {
  return res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Page not found' });
}

module.exports = { handleError, handleRouteError, handleUserNotFoundError };
