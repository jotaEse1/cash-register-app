//input ---> {price and paid} and money available
const operation = (transaction, money) => {
    let {price, paid} = transaction,
        change = Number((paid - price).toFixed(2)),
        moneyCopy = JSON.parse(JSON.stringify(money)), //make a copy WHITOUT REFERENCE TO money, i need to kwnow what currency was used
        moneyCopy2 = JSON.parse(JSON.stringify(money)),
        changeDetails = [];

    //substract change from money
    for (let index = 0; index < moneyCopy.length; index++) {
        moneyCopy[index].amount = Number((moneyCopy[index].amount).toFixed(2)) //for decimals
        moneyCopy2[index].amount = Number((moneyCopy2[index].amount).toFixed(2)) //for decimals

        if(change >= moneyCopy[index].unit){
            while(moneyCopy[index].amount > 0 && change > 0 && change >= moneyCopy[index].unit){
                moneyCopy[index].amount = Number((moneyCopy[index].amount).toFixed(2)) //for decimals
                moneyCopy2[index].amount = Number((moneyCopy2[index].amount).toFixed(2)) //for decimals

                //console.log(`change es ${change} y ahora resta ${moneyCopy[index].unit}, monto antes de restar ${moneyCopy[index].amount}, money amount ${money[index].amount}`)
                moneyCopy[index].amount -= moneyCopy[index].unit
                change = Number((change - moneyCopy[index].unit).toFixed(2))

               
            }
        }
    }

    //change details --> I compare both money and moneyCopy to see the diferences between them.
    for (let index = 0; index < moneyCopy.length; index++) {
        if(moneyCopy[index].amount !== moneyCopy2[index].amount) {
            changeDetails.push({
                currency: moneyCopy2[index].currency,
                amount: Number((moneyCopy2[index].amount - moneyCopy[index].amount).toFixed(2)),
                unit: moneyCopy2[index].unit
            })
        }
    }

    //conditions for the return value
    if(change === 0) return {success: true, moneyCopy, changeDetails}
    if(change !== 0) return {success: false, msg:'Insuficient Funds'}
}

export {operation}

