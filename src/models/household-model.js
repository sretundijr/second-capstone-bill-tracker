
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const householdSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: String, required: true },
      dueDate: { type: String, required: true },
      removed: { type: Boolean, default: false },
    },
  ],
  roommates: [
    {
      name: { type: String, required: true },
      removed: { type: Boolean, default: false },
    },
  ],
});

const Household = mongoose.model('Household', householdSchema);

const createHousehold = (obj) => {
  return Household.create({
    name: obj.name,
    slug: obj.slug,
    expenses: obj.expenses,
    roommates: obj.roommates,
  });
};

const getHousehold = (slug) => {
  return Household
    .findOne({ slug })
    .populate('roommates')
    .populate('expenses')
    .exec();
};

const filterOutRemovedExpenses = (expenses) => {
  const filteredExpenses = [];
  expenses.forEach((item, index) => {
    if (item.removed === false) {
      filteredExpenses.push(item);
    }
  });
  return filteredExpenses;
}

const findOneExpense = (slug, expense) => {
  return { slug, 'expenses._id': expense._id };
};

const updatedExpense = (expense) => {
  return {
    name: expense.name,
    amount: expense.amount,
    dueDate: expense.dueDate,
  };
};

const updateAnExpense = (slug, expense) => {
  return Household
    .updateOne(findOneExpense(slug, expense), { $set: { 'expenses.$': updatedExpense(expense) } })
    .exec();
};

const deleteAnExpense = (slug, expense) => {
  return Household
    .updateOne(findOneExpense(slug, expense), { $set: { 'expenses.$.removed': true } })
    .exec();
};

module.exports = {
  Household,
  createHousehold,
  getHousehold,
  updateAnExpense,
  deleteAnExpense,
  filterOutRemovedExpenses,
};
