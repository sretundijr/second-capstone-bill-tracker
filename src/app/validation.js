const moment = require('moment');

const isValidRoommate = (roommate) => {
  const errors = [];
  if (roommate === '') {
    errors.push('The roommate should have a name');
  }
  if (errors.length > 0) {
    return {
      isValid: false, errors,
    };
  } else {
    return {
      isValid: true,
    };
  }
};

const isValidExpenseName = (expense) => {
  const errors = [];
  if (expense === '') {
    errors.push('The expense should have a name');
  }
  if (errors.length > 0) {
    return {
      isValid: false, errors,
    };
  } else {
    return {
      isValid: true,
    };
  }
};
// perform conversion on manage state
const isValidExpenseAmount = (expense) => {
  const amount = parseFloat(expense);
  if (!(Number.isNaN(amount))) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: false,
    };
  }
};

const isValidExpenseDate = (expenseDate) => {
  const validDate = moment(expenseDate, 'YYYY-MM-DD', true).isValid();
  if (validDate) {
    return {
      isValid: true,
    };
  } else {
    return {
      isValid: false,
    };
  }
};

const validateAnExpense = (expense) => {
  return (isValidExpenseAmount(expense.amount)
    && isValidExpenseDate(expense.dueDate)
    && isValidExpenseName(expense.name));
};

module.exports = {
  isValidRoommate,
  isValidExpenseName,
  isValidExpenseAmount,
  isValidExpenseDate,
  validateAnExpense
};
