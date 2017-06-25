const { isValidRoommate, isValidExpenseName, isValidExpenseAmount, isValidExpenseDate }
    = require('./validation')

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
        let date = isValidExpenseDate(expenses[2]);
        if (name.isValid && number.isValid && date.isValid) {
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

