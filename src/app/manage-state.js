let state = {
    name: '',
    roommates: [],
    expenses: [],

    addRoommate: (data) => {
        let validData = isValidRoommate(data)
        if (validData.isValid) {
            state.roommates.push(data);
        }
        return state;
    },

    removeRoommate: (index) => {
        state.roommates.splice(index, 1);
        return state;
    },

    addExpenseToState: (expenses) => {
        let name = isValidExpenseName(expenses[0])
        let number = isValidExpenseAmount(expenses[1]);
        if (name.isValid && number.isValid) {
            let expense = {
                name: expenses[0],
                amount: expenses[1],
                dueDate: expenses[2]
            };
            state.expenses.push(expense)
            return state;
        }
    },

    removeExpense: (index) => {
        state.expenses.splice(index, 1)
        return state;
    },

    readyForSubmit: () => {
        if (state.roommates.length >= 1 && state.expenses.length >= 1) {
            return true
        } else {
            return false;
        }
    }
}

module.exports = { state };


// move validation
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

let isValidExpenseDate = (expense) => {

}

