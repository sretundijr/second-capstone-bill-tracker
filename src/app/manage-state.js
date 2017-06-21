let state = {
    roommates: [],
    expenses: [],

    addRoommate: (data) => {
        let validData = isValidRoommate(data)
        if (validData) {
            state.roommates.push(data);
        }
        return state;
    },



    removeRoommate: (index) => {
        state.roommates.splice(index, 1);
        return state;
    },

    addExpenseToState: (expenses) => {
        let expense = {
            name: expenses[0],
            amount: expenses[1],
            dueDate: expenses[2]
        };
        state.expenses.push(expense)
        return state;
    },

    removeExpense: (index) => {
        state.expenses.splice(index, 1)
        return state;
    }
}

module.exports = state;

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