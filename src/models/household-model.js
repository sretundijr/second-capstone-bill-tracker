
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
    },
  ],
  roommates: [
    {
      name: { type: String, required: true },
    },
  ],
});

// no arrow functions due the "this" binding
// householdSchema.methods.editAnExpense = function (slug, expense) {
//   const house = this.model('Household').findOne({ slug: slug });
//   return {
//     name: house.name,
//   }
// }

// householdSchema.methods.setHousehold = function (obj) {
//   this.name = obj.name;
//   this.expenses = obj.expenses;
//   this.roommates = obj.roommates;
// };

// householdSchema.methods.getHousehold = function () {
//   return {
//     id: this.id,
//     name: this.name,
//     expenses: this.expenses,
//     roommates: this.roommates,
//   };
// };


// const getHouseHold = (id) => {
//   return Household
//     .findById(id)
//     .exec();
//   // .then(house);
// };

// let Household;

// try {
//   Household = mongoose.model('Household');
// } catch (e) {
const Household = mongoose.model('Household', householdSchema);
// }

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
    .findOne({ slug });
};

const updateAnExpense = (slug, expense) => {
  const updatedExpense = { name: expense.name, amount: expense.amount, dueDate: expense.dueDate };
  return Household.updateOne({ slug, 'expenses._id': expense._id }, { $set: { 'expenses.$': updatedExpense } });
};

module.exports = { Household, createHousehold, getHousehold, updateAnExpense };
