
//make pure 
let forwardOnePage = (current, last) => {
    if (current !== last) {
        current++;
        return pagedResults(state.currentPage);
    } else {
        state.currentPage = state.firstPage;
        return pagedResults(state.firstPage);
    }
}

//make pure
let backOnePage = (state) => {
    if (state.currentIndex > state.firstPage) {
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

module.exports = { getFirstPage, forwardOnePage, backOnePage, };