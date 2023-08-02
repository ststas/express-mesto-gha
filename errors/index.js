function handleError(res, err) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === 'DocumentNotFoundError' || err.name === 'CastError') {
    return res.status(404).send({ message: err.message });
  }
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
}

module.exports = { handleError };
