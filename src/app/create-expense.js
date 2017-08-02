const CreateExpense = require('../templates/create-expense-form.pug');
const PartialExpenseTable = require('../templates/partial-expense-table.pug');
const ExpenseTable = require('../templates/expense-table.pug');

const CreateExpenseForm = () => CreateExpense();

const CreatePartialExpenseTable = () => PartialExpenseTable();

const CreateExpenseTable = (list) => list.map((item, index) => {
  return ExpenseTable({ obj: item, index });
}).join('');

module.exports = { CreateExpenseForm, CreatePartialExpenseTable, CreateExpenseTable };
