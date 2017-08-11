
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
      bills: [
        {
          name: { type: String, required: true },
          amount: { type: String, required: true },
          dueDate: { type: String, required: true },
        },
      ],
    },
  ],
});

// householdSchema.methods.getHouseHold = () => {
//   return {
//     id: this.id,
//     name: this.name,
//     expenses: this.expenses,
//     roommates: this.roommates,
//   };
// };

const getHouseHold = (id) => {
  return Household
    .findById(id)
    .exec();
  // .then(house);
};

const createHousehold = (obj) => {
  return Household.create({
    name: obj.name,
    expenses: obj.expenses,
    roommates: obj.roommates,
  });
};

// let Household;

// try {
//   Household = mongoose.model('Household');
// } catch (e) {
const Household = mongoose.model('Household', householdSchema);
// }


module.exports = Household;
