const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/accounts', accountController.createAccount);
router.get('/accounts/:accountNumber', accountController.getAccount);
router.post('/accounts/:accountNumber/deposit', accountController.deposit);
router.post('/accounts/:accountNumber/withdraw', accountController.withdraw);

module.exports = router;
