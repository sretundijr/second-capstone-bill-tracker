var moment = require('moment');

let isValidRoommate = (roommate) => {
    var errors = [];
    if (roommate.name === '') {
        errors.push('The roommate should have a name')
    }
    if (errors.length > 0) {
        return {
            isValid: false, errors
        }
    } else {
        return {
            isValid: true
        }
    }
}

let isValidExpenseName = (expense) => {
    var errors = [];
    if (expense === '') {
        errors.push('The expense should have a name')
    }
    if (errors.length > 0) {
        return {
            isValid: false, errors
        }
    } else {
        return {
            isValid: true
        }
    }
};
// perform conversion on manage state
let isValidExpenseAmount = (expense) => {
    let amount = parseFloat(expense);
    if (!(Number.isNaN(amount))) {
        return {
            isValid: true
        }
    } else {
        return {
            isValid: false
        }
    }
}

let isValidExpenseDate = (expenseDate) => {
    let validDate = moment(expenseDate, 'YYYY-MM-DD', true).isValid();
    if (validDate) {
        return {
            isValid: true
        }
    } else {
        return {
            isValid: false
        }
    }
}

module.exports = { isValidRoommate, isValidExpenseName, isValidExpenseAmount, isValidExpenseDate }