const mongoose = require('mongoose');

//schema
const currencySchema = mongoose.Schema({
    currencies: [{
        currency: String,
        unit: Number,
        amount: Number
    }]
})
//model
const Currency = mongoose.model('Currencie', currencySchema)
//actions

const findCurrencies = async (id) => {
    const result = await Currency.find({_id: id})
    return result[0].currencies
}

const updateCurrencies = async (data, id) => {
    const result = await Currency.updateOne({_id: id}, {$set: {currencies: data}})
    return result.modifiedCount
}


// const info = [
//         {currency: 'HUNDRED', unit: 100, amount: 0},
//         {currency: 'FIFTY', unit: 50, amount: 0},
//         {currency: 'TWENTY', unit: 20, amount: 0},
//         {currency: 'TEN', unit: 10, amount: 0},
//         {currency: 'FIVE', unit: 5, amount: 0},
//         {currency: 'TWO', unit: 2, amount: 0},
//         {currency: 'ONE', unit: 1, amount: 0},
//         {currency: 'HALF', unit: 0.50, amount: 0},
//         {currency: 'QUARTER', unit: 0.25, amount: 0},
//         {currency: 'DIME', unit: 0.10, amount: 0},
//         {currency: 'PENNY', unit: 0.01, amount: 0},
// ]

// const aidi = '624eea21618d8a1c606bf937'

// updateCurrencies(info, aidi)

module.exports = {
    findCurrencies,
    updateCurrencies
}