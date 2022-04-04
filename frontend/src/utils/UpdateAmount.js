//inputs --> operation type, edit amount, currency, all money 
const updateAmount = (op, amount, currency, money) => {
    const moneyCopy = JSON.parse(JSON.stringify(money)); // a copy without reference to money

    if(op === 'Retire'){
        moneyCopy.forEeach(obj => {if(obj.currency === currency) obj.amount -= amount})
        return moneyCopy
    }
    if(op === 'Add'){
        moneyCopy.forEeach(obj => {if(obj.currency === currency) obj.amount += Number(amount)})
        return moneyCopy
    }
}

export {updateAmount}