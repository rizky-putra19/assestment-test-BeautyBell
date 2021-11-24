const express = require('express');
const router = express.Router();
const userBillControllers = require('../controllers/userBillsControlllers');
const { loginCheck } = require('../middlewares/authentication')

router.post('/count-bill', loginCheck, userBillControllers.generateBills);
router.delete('/delete-bill', loginCheck, userBillControllers.deleteAllBill);

module.exports = router;