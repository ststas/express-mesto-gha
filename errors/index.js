function handleError(res, err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: err.message });
  }
  return res.status(500).send({ message: 'На сервере произошла ошибка' });
}

// function handleRouteError(req, res) {
//   return res.status(404).send({ message: 'Page not found' });
// }

module.exports = { handleError };
