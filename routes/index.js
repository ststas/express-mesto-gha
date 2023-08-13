const router = require('express').Router();
const { handleRouteError } = require('../errors');
const { validateSignUp, validateSignIn } = require('../middlewares/validation');
// const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signup', validateSignUp(), createUser);

router.post('/signin', validateSignIn(), login);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// router.post('/signin', validateSignIn(), auth, login);
// router.use('/users', auth, usersRouter);
// router.use('/cards', auth, cardsRouter);

router.all('*', handleRouteError);

module.exports = router;
