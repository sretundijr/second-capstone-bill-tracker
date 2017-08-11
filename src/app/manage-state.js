const {
  isValidRoommate,
  isValidExpenseName,
  isValidExpenseAmount,
  isValidExpenseDate,
  validateAnExpense,
} = require('./validation');

const slugify = require('slugify');

const { formatTheMoneyInput } = require('./formatting');

class CreateHouseState {
  constructor() {
    this.state = {
      name: '',
      slug: '',
      roommates: [],
      expenses: [],
    };
    this.setHouseHold = this.setHouseHold.bind(this);
  }

  getSlug() {
    return this.state.slug;
  }

  getHouseHold() {
    return this.state;
  }

  setHouseHold(obj) {
    this.state = obj;
  }

  setHouseName(data) {
    this.state.slug = slugify(data);
    this.state.name = data;
  }

  getHouseName() {
    return this.state.name;
  }

  addRoommate(data) {
    const validData = isValidRoommate(data);
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
    return this.state.roommates;
  }

  // list is an array of two arrays containing objects
  saveExpensesToRoommate(list) {
    list.forEach((item, index) => {
      this.state.roommates[index].bills = list[index];
    });
  }

  addEmptyExpense() {
    const expenseObject = {
      name: '',
      amount: '',
      dueDate: '',
      editable: true,
    };
    this.state.expenses.push(expenseObject);
  }

  addExpenseToState(expenses) {
    const name = isValidExpenseName(expenses.name);
    const number = isValidExpenseAmount(expenses.amount);
    const date = isValidExpenseDate(expenses.dueDate);
    if (name.isValid && number.isValid && date.isValid) {
      const expense = {
        name: expenses.name,
        amount: formatTheMoneyInput(expenses.amount),
        dueDate: expenses.dueDate,

      };
      this.state.expenses.push(expense);
      return expense;
    }
    // todo add better error handling
    return console.error('validation error');
  }

  editExpense(expense, index) {
    if (validateAnExpense(expense)) {
      this.state.expenses[index].name = expense.name;
      this.state.expenses[index].dueDate = expense.dueDate;
      this.state.expenses[index].amount = formatTheMoneyInput(expense.amount);
    }
    return this.state.expenses[index];
  }

  removeExpense(index) {
    this.state.expenses.splice(index, 1);
    return this.state.expenses.length;
  }

  getOneExpense(index) {
    return this.state.expenses[index];
  }

  getExpenses() {
    return this.state.expenses;
  }

  readyForSubmit() {
    if (this.state.roommates.length >= 1 && this.state.expenses.length >= 1) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = CreateHouseState;

