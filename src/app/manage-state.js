
// fix paging
let state = {
    name: '',
    firstPage: 0,
    currentPage: 0,
    lastPage: (list) => { return list.length },
    roommates: [],
    expenses: [],

    addRoommate: (data) => {
        let validData = isValidRoommate(data)
        if (validData.isValid) {
            state.roommates.push({ name: data });
        }
        return state.roommates.length;
    },

    removeRoommate: (index) => {
        state.roommates.splice(index, 1);
        return state.roommates.length;
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
            return state.expenses;
        }
    },

    removeExpense: (index) => {
        state.expenses.splice(index, 1)
        return state.expenses.length;
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

