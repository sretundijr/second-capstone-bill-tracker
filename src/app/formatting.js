const moneyMath = require('money-math');


const formatTheMoneyInput = (numString) => {
  const num = parseFloat(numString);
  return moneyMath.floatToAmount(num);
};

module.exports = { formatTheMoneyInput };
