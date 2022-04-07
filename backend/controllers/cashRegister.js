//actions from dataBase
const {
    findCurrencies,
    updateCurrencies
} = require('../dataBase')

const getTransactions = (req, res) => {
    const {id} = req.query;

    findCurrencies(id)
        .then(data => res.status(200).json({success: true, data}))
        .catch(error => res.status(404).json({success: false, error}))
}

const updateTransactions = (req, res) => {
    const data = req.body,
        {id} = req.query;

    updateCurrencies(data, id)
        .then(data => res.status(200).json({success: true, data}))
        .catch(error => res.status(500).json({success: false, error}))
}


module.exports = {
    getTransactions,
    updateTransactions
}