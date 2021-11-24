const express = require('express');
const router = express.Router();
const taxObjectController = require('../controllers/taxObjectsControllers');
const { loginCheck } = require('../middlewares/authentication');

router.post('/create-object', loginCheck, taxObjectController.inputItem);
router.delete('/delete/:id', loginCheck, taxObjectController.deleteObjectById);
router.delete('/delete-all', loginCheck, taxObjectController.deleteAllObject);

module.exports = router;