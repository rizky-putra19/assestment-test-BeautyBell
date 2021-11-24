const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');
const { loginCheck } = require('../middlewares/authentication')

router.post('/signup', userControllers.signup);
router.post('/signin', userControllers.signin);
router.delete('/delete-account', loginCheck, userControllers.deleteAccount);


module.exports = router;