const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  handleError,
  handleWrongCredentials,
  handleEmailIsRegisteredError,
} = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    })
      .then((user) => res.status(201).send({
        email: user.email, name: user.name, about: user.about, avatar: user.avatar, _id: user._id
      })))
    .catch((err) => {
      if (err.code === 11000) {
        return handleEmailIsRegisteredError(res);
      } return handleError(res, err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return handleWrongCredentials(res, 'Wrong email or password');;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return handleWrongCredentials(res, 'Wrong email or password');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'my-very-secret-key', {
            expiresIn: '7d',
          });
          res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
          return res.status(200).json({ _id: user._id });
        });
    })
    .catch((err) => handleError(res, err));
};

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
  } return handleWrongCredentials(res, `Invalid User ID: ${userId}. User ID must contain 24 symbols`);
};

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  if (userId.length === 24) {
    return User.findById(userId)
      .orFail()
      .then((user) => res.status(200).send(user))
      .catch((err) => handleError(res, err));
  } return handleWrongCredentials(res, `Invalid User ID: ${userId}. User ID must contain 24 symbols`);
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
