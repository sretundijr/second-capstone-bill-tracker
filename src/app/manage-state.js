const { isValidRoommate, isValidExpenseName, isValidExpenseAmount, isValidExpenseDate }
    = require('./validation')

const ARRAY = require('lodash/array');
const billsPerPage = 4
const pagedResultsArray = (bills) => ARRAY.chunk(bills, billsPerPage);

let manageState = () => {
    return {
        name: '',
        firstPage: 0,
        currentPage: 0,
        lastPage: pagedResultsArray.length,
        roommates: [],
        expenses: []
    }
}

// fix paging
let updateState = () => {
    let state = manageState();

    return {
        setHouseName: (data) => {
            state.name = data;
        },

        getHouseName: () => {
            return state.name;
        },

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

        getRoommates: () => {
            return state.roommates
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

        getExpenses: () => {
            return state.expenses
        },

        readyForSubmit: () => {
            if (state.roommates.length >= 1 && state.expenses.length >= 1) {
                return true
            } else {
                return false;
            }
        }
    }
}

module.exports = { updateState };

