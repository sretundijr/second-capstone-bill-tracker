const {
    isValidRoommate,
	isValidExpenseName,
	isValidExpenseAmount,
	isValidExpenseDate,
	validateAnExpense
} = require('./validation')

const { formatTheMoneyInput } = require('./formatting')

class CreateHouseState {
	constructor() {
		this.state = {
			name: '',
			roommates: [],
			expenses: []
		}
		this.setHouseHold = this.setHouseHold.bind(this);
	}

	getHouseHold() {
		return this.state;
	}

	setHouseHold(obj) {
		this.state = obj;
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

	// list is an array of two arrays containing objects
	saveExpensesToRoommate(list) {
		list.forEach((item, index) => {
			for (let property in item) {
				this.state.roommates[index][property] = item[property]
			}
		})
	}

	addExpenseToState(expenses) {
		let name = isValidExpenseName(expenses.name)
		let number = isValidExpenseAmount(expenses.amount);
		let date = isValidExpenseDate(expenses.dueDate);
		if (name.isValid && number.isValid && date.isValid) {
			let expense = {
				name: expenses.name,
				amount: formatTheMoneyInput(expenses.amount),
				dueDate: expenses.dueDate

			};
			this.state.expenses.push(expense)
			return expense;
		}
	}

	editExpense(expense, index) {
		if (validateAnExpense(expense)) {
			this.state.expenses[index].name = expense.name;
			this.state.expenses[index].dueDate = expense.dueDate;
			this.state.expenses[index].amount = formatTheMoneyInput(expense.amount)
		}
		return this.state.expenses[index];
	}

	removeExpense(index) {
		this.state.expenses.splice(index, 1)
		return this.state.expenses.length;
	}

	getOneExpense(index) {
		return this.state.expenses[index];
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

