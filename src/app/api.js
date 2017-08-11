/* global localStorage fetch */

const house = require('./mock-model');

const localObj = 'localObj';

const retrieveFromLocal = () => {
  return JSON.parse(localStorage.getItem(localObj));
};

const saveToLocal = (obj) => {
  localStorage.setItem(localObj, JSON.stringify(obj));
};

const getHouseHold = (slug) => {
  return fetch(`/api/household/${slug}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    });
};

// todo talk about this, is returning a promise here correct
const createHouseHold = (obj) => {
  return fetch('/api/household', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then(response => Promise.resolve(response.json()));
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

// todo add endpoint to resolve error
// list is an array of arrays, the number
// of arrays represents the number of roommates
const addOrEditRoommatesBills = (list, slug) => {
  console.log(list, slug);
  return fetch(`/api/roommates/bills/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  })
    .then((response) => {

    });
  // .then(response => Promise.resolve(response.json()));
  // const retrieve = retrieveFromLocal();
  // list.forEach((arr, index) => {
  //   retrieve.roommates[index].bills = [];
  //   arr.forEach((expense) => {
  //     retrieve.roommates[index].bills.push(expense);
  //   });
  // });
  // saveToLocal(retrieve);
  // return Promise.resolve(retrieve.roommates);
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
  return Promise.resolve(obj);
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
