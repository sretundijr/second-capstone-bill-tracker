
let expenses = require('./mock-model');

const getHousHold = () => {
    // console.log(expenses);
    // return expenses;
    const retrieve = localStorage.getItem('localObj')
    console.log(JSON.parse(retrieve))
    removeHouseHold();
    return JSON.parse(retrieve);
}

const saveHouseHold = (obj) => {
    expenses.push(obj);
    localStorage.setItem('localObj', JSON.stringify(obj));
}

const removeHouseHold = () => {
    localStorage.removeItem('localObj');
}

module.exports = { getHousHold, saveHouseHold };