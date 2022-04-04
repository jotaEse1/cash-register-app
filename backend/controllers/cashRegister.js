//actions from dataBase
const {
    findCurrencies,
    updateCurrencies
} = require('../dataBase')

const getTransactions = (req, res) => {
    findCurrencies()
        .then(data => res.status(200).json({success: true, data}))
        .catch(error => res.status(404).json({success: false, error}))
}

const updateTransactions = (req, res) => {
    const data = req.body;

    updateCurrencies(data)
        .then(data => res.status(200).json({success: true, data}))
        .catch(error => res.status(404).json({success: false, error}))
}


module.exports = {
    getTransactions,
    updateTransactions
}