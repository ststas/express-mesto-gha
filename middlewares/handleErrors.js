const { constants } = require('http2');
const { default: mongoose } = require('mongoose');

function handleErrors(err, req, res, next) {
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: err.message });
  } else {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    next();
}
}

module.exports = { handleErrors };
