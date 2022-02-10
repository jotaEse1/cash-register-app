const express = require('express');
const router = express.Router()

//controllers
const {
    getTransactions,
    updateTransactions
} = require('../controllers/cashRegister');

//routes
router.route('/transactions').get(getTransactions).put(updateTransactions)

module.exports = router