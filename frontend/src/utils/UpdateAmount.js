//inputs --> operation type, edit amount, currency, all money 
const updateAmount = (op, amount, currency, money) => {
    const moneyCopy = JSON.parse(JSON.stringify(money)); // a copy without reference to money

    if(op === 'Retire'){
        moneyCopy.map(obj => {if(obj.currency === currency) obj.amount -= Number(amount)})
        return moneyCopy
    }
    if(op === 'Add'){
        moneyCopy.map(obj => {if(obj.currency === currency) obj.amount += Number(amount)})
        return moneyCopy
    }
}

export {updateAmount}