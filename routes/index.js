const router = require('express').Router();
const { handleRouteError } = require('../errors');
const { validateSignUp, validateSignIn } = require('../middlewares/validation')

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');


router.post('/signin', validateSignIn(), login);
router.post('/signup', validateSignUp(), createUser);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.all('*', handleRouteError)




module.exports = router;
