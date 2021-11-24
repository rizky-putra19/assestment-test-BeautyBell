const express = require('express');
const router = express.Router();
const taxObjectsRouter = require('./taxObjectsRouter');
const userBillsRouter = require('./userBillsRouter');
const usersRouter = require('./usersRouter')

router.use('/tax-object', taxObjectsRouter);
router.use('/user-bills', userBillsRouter);
router.use('/users', usersRouter);

module.exports = router;

