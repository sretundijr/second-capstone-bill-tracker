const CreateExpense = require('../templates/create-expense-form.pug');
const PartialExpenseTable = require('../templates/partial-expense-table.pug');
const ExpenseTable = require('../templates/expense-table.pug');

const CreateExpenseForm = () => {
  return CreateExpense();
}

const CreatePartialExpenseTable = () => {
  return PartialExpenseTable();
}

const CreateExpenseTable = (list) => {
  return list.map((item, index) => {
    return ExpenseTable({ obj: item, index })
  }).join('')
}

module.exports = { CreateExpenseForm, CreatePartialExpenseTable, CreateExpenseTable }