const moneyMath = require('money-math')


const formatTheMoneyInput = (numString) => {
    let num = parseFloat(numString);
    return moneyMath.floatToAmount(num);
}

module.exports = { formatTheMoneyInput }