const moneyMath = require('money-math')


const formatTheMoneyInput = (numString) => {
    let num = parseFloat(numString);
    return moneyMath.floatToAmount(num);
}

const formatNumberOfRoommates = (numRoommates) => {
    let num = parseFloat(numRoommates)
    return moneyMath.floatToAmount(num);
}

module.exports = { formatTheMoneyInput }