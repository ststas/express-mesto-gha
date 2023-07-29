const router = require('express').Router();
const { createUser } = require('../controllers/tests');

router.post('/', createUser);

module.exports = router;
