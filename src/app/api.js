
const house = require('./mock-model');

const localObj = 'localObj';

const retrieveFromLocal = () => {
  return JSON.parse(localStorage.getItem('localObj'));
}

const saveToLocal = (obj) => {
  localStorage.setItem('localObj', JSON.stringify(obj));
}

const getHousHold = () => {
  return Promise.resolve(retrieveFromLocal());
};

const saveHouseHold = (obj) => {
  saveToLocal(obj);
  return Promise.resolve(obj);
};

const editExpense = (expense, index) => {
  const retrieve = retrieveFromLocal();
  for (var prop in expense) {
    if (retrieve.expenses[index].hasOwnProperty(prop)) {
      retrieve.expenses[index][prop] = expense[prop];
    }
  };
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.expenses);
};

const addOrEditRoommatesBills = (list) => {

}

const removeHouseHold = () => {
  localStorage.removeItem('localObj');
};

const createDemoHouse = () => {
  const obj = {
    name: house[0].name,
    roommates: house[0].roommates.slice(0),
    expenses: house[0].expenses.slice(0)
  };
  saveHouseHold(obj);
  return obj;
};

module.exports = { getHousHold, saveHouseHold, editExpense, createDemoHouse };
