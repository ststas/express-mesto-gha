const Card = require('../models/card');
const { handleError } = require('../errors');

module.exports.getCards = (req, res) => Card.find()
  .orFail()
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch((err) => handleError(res, err));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((updatedCard) => res.status(201).send(updatedCard))
        .catch((err) => handleError(res, err));
    })
    .catch((err) => handleError(res, err));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card.findByIdAndRemove(cardId)
    .orFail()
    .then((deletedCard) => res.status(200).send(deletedCard))
    .catch((err) => handleError(res, err));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((likedCard) => res.status(200).send(likedCard))
    .catch((err) => handleError(res, err));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((dislikedCard) => res.status(200).send(dislikedCard))
    .catch((err) => handleError(res, err));
};
