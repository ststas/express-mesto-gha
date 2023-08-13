const router = require('express').Router();
const {
  getUsers, getUserById, getUserInfo, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');
const {
  validateGetUserById,
  validateGetUserInfo,
  validateUserInfo,
  validateUserAvatar,
} = require('../middlewares/validation')

router.get('/', getUsers);
router.get('/me', validateGetUserInfo(), getUserInfo);
router.get('/:userId', validateGetUserById(), getUserById);
router.patch('/me', validateUserInfo(), updateUserInfo);
router.patch('/me/avatar', validateUserAvatar(), updateUserAvatar);

module.exports = router;
