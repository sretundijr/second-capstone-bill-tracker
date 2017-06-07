
const ARRAY = require('lodash/array');

const billsPerPage = 4
const fiveResultsEach = (bills) => ARRAY.chunk(bills, billsPerPage);

//remove state
let state = {
    firstPage: 0,
    currentPage: 0,
    lastPage: fiveResultsEach.length - 1
}

//make pure 
let forwardOnePage = (currentIndex) => {
    if (currentIndex !== state.lastPage) {
        state.currentPage++;
        return pagedResults(state.currentPage);
    } else {
        state.currentPage = state.firstPage;
        return pagedResults(state.firstPage);
    }
}

//make pure
let backOnePage = (currentIndex) => {
    if (currentIndex > state.firstPage) {
        state.currentPage--;
        return pagedResults(state.currentPage)
    } else {
        state.currentPage = state.lastPage;
        return pagedResults(state.lastPage);
    }
}

let getFirstPage = (bills) => {
    return pagedResults(0, bills);
}

let pagedResults = (index, bills) => {
    return fiveResultsEach(bills)[index];
}

module.exports = { getFirstPage, forwardOnePage, backOnePage, state };