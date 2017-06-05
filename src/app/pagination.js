const HouseHolds = require('./mock-model');
const ARRAY = require('lodash/array');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

const billsPerPage = 4
const fiveResultsEach = ARRAY.chunk(lotsOfBills, billsPerPage);

let state = {
    firstPage: 0,
    currentPage: 0,
    lastPage: fiveResultsEach.length - 1
}

let forwardOnePage = (currentIndex) => {
    if (currentIndex !== state.lastPage) {
        state.currentPage++;
        return pagedResults(state.currentPage);
    } else {
        state.currentPage = state.firstPage;
        return pagedResults(state.firstPage);
    }
}

let backOnePage = (currentIndex) => {
    if (currentIndex > state.firstPage) {
        state.currentPage--;
        return pagedResults(state.currentPage)
    } else {
        state.currentPage = state.lastPage;
        return pagedResults(state.lastPage);
    }
}

let getFirstPage = () => {
    return pagedResults(state.firstPage);
}

let pagedResults = (index) => {
    return fiveResultsEach[index];
}

module.exports = { getFirstPage, forwardOnePage, backOnePage, state };