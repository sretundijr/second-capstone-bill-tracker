/* global localStorage fetch */

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

// todo change name to create household
const createHouseHold = (obj) => {
  fetch('/api/household', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  // saveToLocal(obj);
  return Promise.resolve(obj);
};

const editExpense = (expense, index) => {
  const retrieve = retrieveFromLocal();
  retrieve.expenses[index] = expense;
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.expenses);
};

const removeExpense = (index) => {
  const retrieve = retrieveFromLocal();
  retrieve.expenses.splice(index, 1);
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.expenses);
};

const addRoommate = (roommate) => {
  const retrieve = retrieveFromLocal();
  retrieve.roommates.push(roommate);
  saveToLocal(retrieve);
  return Promise.resolve(retrieve.roommates);
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
  createHouseHold(obj);
  return obj;
};

module.exports = {
  getHouseHold,
  createHouseHold,
  editExpense,
  removeExpense,
  addRoommate,
  addOrEditRoommatesBills,
  createDemoHouse,
};
