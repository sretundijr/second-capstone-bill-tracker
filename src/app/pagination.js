const HouseHolds = require('./mock-model');
const ARRAY = require('lodash/array');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

const fiveResultsEach = ARRAY.chunk(lotsOfBills, 4);

let state = {
    firstPage: 0,
    currentPage: 0,
    lastPage: fiveResultsEach.length - 1
}

let forwardOnePage = (currentIndex) => {
    if (currentIndex !== state.lastPage) {
        currentIndex++;
        state.currentPage = currentIndex;
        return pagedResults(state.currentPage);
    } else {
        state.currentPage = state.firstPage;
        return pagedResults(state.firstPage);
    }
}

let backOnePage = (currentIndex) => {
    if (currentIndex > state.firstPage) {
        currentIndex--;
        state.currentPage = currentIndex;
        return pagedResults(state.currentPage)
    } else {
        state.currentPage = state.lastPage;
        return pagedResults(state.lastPage);
    }
}

let sendFirstPage = () => {
    return pagedResults(state.firstPage);
}

let pagedResults = (index) => {
    return fiveResultsEach[index];
}

module.exports = { sendFirstPage, forwardOnePage, backOnePage, state };