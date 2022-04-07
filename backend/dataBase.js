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


module.exports = {
    findCurrencies,
    updateCurrencies
}