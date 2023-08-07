const User = require('../models/user');
const { handleError, handleUserNotFoundError } = require('../errors');

module.exports.getUsers = (req, res) => User.find()
  .then((users) => res.status(200).send(users))
  .catch((err) => handleError(res, err));

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  if (userId.length === 24) {
    return User.findById(userId)
      .orFail()
      .then((user) => res.status(200).send(user))
      .catch((err) => handleError(res, err));
  } return handleError(res, handleUserNotFoundError(res, userId));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleError(res, err));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => handleError(res, err));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((updatedUser) => res.status(200).send(updatedUser))
    .catch((err) => handleError(res, err));
};
