/* global fetch */

const house = require('./mock-model');

const getHouseHold = (slug) => {
  return fetch(`/api/household/${slug}`, {
    method: 'GET',
  })
    .then(response => response.json());
};

const createHouseHold = (obj) => {
  return fetch('/api/household', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  }).then(response => response.json());
};

const saveNewExpense = (expense, slug) => {
  return fetch(`/api/expenses/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
};

const modifyAnExpense = (expense, slug) => {
  return fetch(`/api/expenses/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
};

const editExpense = (expense, slug) => {
  return modifyAnExpense(expense, slug)
    .then(response => response.json());
};

const removeExpense = (expense, slug) => {
  return fetch(`/api/expenses/delete/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
    .then(response => response.json());
};

const addRoommate = (roommate, slug) => {
  return fetch(`/api/roommates/new/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roommate),
  });
};

const editRoommate = (roommate, slug) => {
  return fetch(`/api/roommates/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roommate),
  });
};

const removeRoommate = (roommate, slug) => {
  return fetch(`/api/roommates/remove/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roommate),
  });
};

const createRandomNumberForDemo = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

const createDemoHouse = () => {
  const obj = {
    name: `${house[0].name} ${createRandomNumberForDemo()}`,
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
  createDemoHouse,
  saveNewExpense,
  editRoommate,
  removeRoommate,
};
