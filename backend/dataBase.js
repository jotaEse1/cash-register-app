const mongoose = require('mongoose');
const path = require('path');
require ('dotenv').config({path: path.resolve('.env')})

//connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => err)

//schema
const schema = mongoose.Schema({
    currency: String,
    unit: Number,
    amount: Number
})
//model
const Currency = mongoose.model('Currencie', schema)
//actions

const findCurrencies = async () => {
    const result = await Currency.find().sort('-unit').select('-__v')
    return result
}

const updateCurrencies = (data) => {
    data.map(async (obj) => {
        const {currency, amount} = obj,
            update = await Currency.updateOne({currency},{amount})
    })
     
}


module.exports = {
    findCurrencies,
    updateCurrencies
}