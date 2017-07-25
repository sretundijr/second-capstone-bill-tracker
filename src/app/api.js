
const house = require('./mock-model');

const localObj = 'localObj';

const getHousHold = () => {
  const retrieve = localStorage.getItem('localObj');
  return Promise.resolve(JSON.parse(retrieve));
};

// how do I make this a promise
const saveHouseHold = (obj) => {
  localStorage.setItem('localObj', JSON.stringify(obj));
};

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

module.exports = { getHousHold, saveHouseHold, createDemoHouse };
