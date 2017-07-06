const { isValidRoommate, isValidExpenseName, isValidExpenseAmount, isValidExpenseDate }
    = require('./validation')

// const ARRAY = require('lodash/array');
// const billsPerPage = 4
// const pagedResultsArray = (bills) => ARRAY.chunk(bills, billsPerPage);

class CreateHouseState {
    constructor() {
        this.state = {
            name: '',
            roommates: [],
            expenses: []
        }
    }

    setHouseName(data) {
        this.state.name = data;
    }

    getHouseName() {
        return this.state.name;
    }

    addRoommate(data) {
        let validData = isValidRoommate(data)
        if (validData.isValid) {
            this.state.roommates.push({ name: data });
        }
        return this.state.roommates.length;
    }

    removeRoommate(index) {
        this.state.roommates.splice(index, 1);
        return this.state.roommates.length;
    }

    getRoommates() {
        return this.state.roommates
    }

    saveExpensesToRoommate(list) {


        this.addRoommate('steve');
        this.addRoommate('christina')

        this.state.roommates.map((obj, index) => {
            obj.bills = [];
            list[index].map((item) => {
                obj.bills.push(item);
            })
        })

        return this.state.roommates;

    }

    addExpenseToState(expenses) {
        let name = isValidExpenseName(expenses.name)
        let number = isValidExpenseAmount(expenses.amount);
        let date = isValidExpenseDate(expenses.dueDate);
        if (name.isValid && number.isValid && date.isValid) {
            let expense = {
                name: expenses.name,
                amount: expenses.amount,
                dueDate: expenses.dueDate

            };
            this.state.expenses.push(expense)
            return expense;
        }
    }

    removeExpense(index) {
        this.state.expenses.splice(index, 1)
        return this.state.expenses.length;
    }

    getExpenses() {
        return this.state.expenses
    }

    readyForSubmit() {
        if (this.state.roommates.length >= 1 && this.state.expenses.length >= 1) {
            return true
        } else {
            return false;
        }
    }
}

module.exports = CreateHouseState;

