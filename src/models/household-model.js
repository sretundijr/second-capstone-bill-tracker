
const mongoose = require('mongoose');

const householdSchema = mongoose.Schema({
  name: { type: String, required: true },
  expenses: [
    {
      name: { type: String, required: true },
      amount: { type: String, required: true },
      dueDate: { type: String, required: true }
    }

  ],
  roommates: [
    {
      name: { type: String, required: true },
      bills: [
        {
          name: { type: String, required: true },
          amount: { type: String, required: true },
          dueDate: { type: String, required: true },
          roommateAmountDue: { type: String, required: true }
        }
      ]
    }
  ]
})