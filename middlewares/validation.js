const { Joi, celebrate } = require('celebrate');
const { RegExUrl, RegExToken } = require('../constants/constants');

module.exports.validateSignUp = () => celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(RegExUrl),
    }),
  })

module.exports.validateSignIn = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
})

module.exports.validateGetUserById = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
})

module.exports.validateGetUserInfo = () => celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern(RegExToken),
  }).unknown(true),
})

module.exports.validateUserInfo = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
})

module.exports.validateUserAvatar = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(RegExUrl),
  }),
})

module.exports.validateCardCreation = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(RegExUrl),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern(RegExToken),
  }).unknown(true),
})

module.exports.validateCardRemoval = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern(RegExToken),
  }).unknown(true),
})

module.exports.validateCardLike = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern(RegExToken),
  }).unknown(true),
})

module.exports.validateCardDislike = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().pattern(RegExToken),
  }).unknown(true),
})