const express = require('express');
const { body } = require('express-validator');

const verifyController = require('../controllers/verify');

const router = express.Router();

router.put('/verify', verifyController.verify);
router.put('/deposit', verifyController.deposit);
router.put('/transfer', verifyController.transfer);

module.exports = router;
