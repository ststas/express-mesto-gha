const Card = require('../models/card');
const { handleError } = require('../errors');

const { handleAccessDenied } = require('../errors');

module.exports.getCards = (req, res) => Card.find()
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
  return Card.findById(cardId)
    .orFail()
    .then((deletedCard) => {
      if (req.user._id !== String(deletedCard.owner._id)) {
        return handleAccessDenied(res);
      }
      return deletedCard.deleteOne()
        .then((card) => res.status(200).send(card));
    })
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
