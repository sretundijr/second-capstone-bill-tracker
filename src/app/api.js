/* global localStorage */
const house = require('./mock-model');

const localObj = 'localObj';

const retrieveFromLocal = () => {
  return JSON.parse(localStorage.getItem(localObj));
};

const saveToLocal = (obj) => {
  localStorage.setItem(localObj, JSON.stringify(obj));
};

const getHouseHold = () => {
  return Promise.resolve(retrieveFromLocal());
};

const saveHouseHold = (obj) => {
  saveToLocal(obj);
  return Promise.resolve(obj);
};

const editExpense = (expense, index) => {
  const retrieve = retrieveFromLocal();
  for (const property in expense) {
    if (retrieve.expenses[index].hasOwnProperty(property)) {
      retrieve.expenses[index][property] = expense[property];
    }
  }
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.expenses);
};

const addOrEditRoommatesBills = (list) => {
  const retrieve = retrieveFromLocal();
  list.forEach((arr, index) => {
    retrieve.roommates[index].bills = [];
    arr.forEach((expense) => {
      retrieve.roommates[index].bills.push(expense);
    });
  });
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.roommates);
};

const removeHouseHold = () => {
  localStorage.removeItem(localObj);
};

const createDemoHouse = () => {
  const obj = {
    name: house[0].name,
    roommates: house[0].roommates.slice(0),
    expenses: house[0].expenses.slice(0),
  };
  saveHouseHold(obj);
  return obj;
};

module.exports = {
  getHouseHold,
  saveHouseHold,
  editExpense,
  addOrEditRoommatesBills,
  createDemoHouse,
};
