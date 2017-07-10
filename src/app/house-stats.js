
const HouseHolds = require('./mock-model');
const HOUSE_HTML = require('./house-stats-html');
const CreateHouseState = require('./manage-state')
const EXPENSE_DIVIDED_HTML = require('./expenses-divided-html')
const { billingSummary } = require('./divide-expenses')
const { getFirstPage, forwardOnePage, backOnePage } = require('./pagination');
const { getHousHold, saveHouseHold } = require('./api')


// need better names
let state = new CreateHouseState();

state.setHouseHold(getHousHold());
// state.setHouseHold(HouseHolds);


let bills = state.getExpenses();
const lotsOfBills = bills;

let buildTable = (bills) => bills.map((item, index) => HOUSE_HTML(item, index));

let tableToString = (bills) => buildTable(bills).join('');

let getTableBodyId = () => document.getElementById('main-content-js');

let renderTableData = (bills) => {
    getTableBodyId().innerHTML = tableToString(bills);
    return watchEdit();
}

let isEditable = (index) => {
    if (lotsOfBills[index].editable) {
        return false;
    } else {
        return true;
    }
}

let watchEdit = () => {
    let editButton = document.getElementsByClassName("watch-js");

    Array.from(editButton).forEach(function (element, i, array) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            let element = e.target
            let index = element.id.substring(10);
            index = parseInt(index);
            lotsOfBills[index].editable = isEditable(index);
            renderPage(lotsOfBills);
            document.getElementById(element.id).addEventListener('click', (event) => {
                // needs to be called from the save event listener
                setEditedRow(event, index);
            })
        });
    });
}

let setEditedRow = (e, i) => {
    let data = e.target.parentNode.parentNode.getElementsByTagName('input')
    const dataObj = {
        name: data.name.value,
        dueDate: data.dueDate.value,
        amount: data.amount.value
    }
    state.editExpense(dataObj, i)

    renderPage(state.getExpenses());
}

// let watchNextBtn = () => {
//     let nextBtn = document.getElementById('next-js');
//     nextBtn.addEventListener('click', (e) => {
//         lotsOfBills = forwardOnePage(state.currentPage);
//         renderTableData(lotsOfBills)
//     })
// }

// let watchPreviousBtn = () => {
//     let previousBtn = document.getElementById('previous-js');
//     previousBtn.addEventListener('click', (e) => {
//         lotsOfBills = backOnePage(state.currentPage);
//         renderTableData(lotsOfBills);
//     })
// }

const divideTheExpenses = () => {
    const expenses = lotsOfBills.map((item) => {
        return item.amount;
    })
    // make dynamic
    const dividedBills = billingSummary(lotsOfBills, '300.00', '2.00')
    let saved = state.saveExpensesToRoommate(dividedBills);
    return saved;
}

const createHtml = () => {
    return divideTheExpenses().map((arr) => {
        return EXPENSE_DIVIDED_HTML(arr.bills, arr.name);
    })
}

const renderExpenseSummary = () => {
    if (state.getExpenses().length > 1 && state.getRoommates().length > 1) {
        const summaryContainer = document.getElementById('expense-summary-container');
        summaryContainer.innerHTML = createHtml().join('');
    }
}

const renderPage = () => {
    renderExpenseSummary();
    renderTableData(lotsOfBills);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage();

    // watchNextBtn();
    // watchPreviousBtn();
});
