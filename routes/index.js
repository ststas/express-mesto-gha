const router = require('express').Router();
const { validateSignUp, validateSignIn } = require('../middlewares/validation')

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.post('/signin', validateSignIn(), login);
router.post('/signup', validateSignUp(), createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
