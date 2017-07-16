
const HOUSE_HTML = require('../views/house-stats-html');
const CreateHouseState = require('./manage-state')
const EXPENSE_DIVIDED_HTML = require('../views/expenses-divided-html')
const { billingSummary } = require('./divide-expenses')
const { getFirstPage, forwardOnePage, backOnePage } = require('./pagination');
const { getHousHold, saveHouseHold } = require('./api')
const { formatTheMoneyInput } = require('./formatting')
const Pikaday = require('pikaday');
require('pikaday/css/pikaday.css');
require('../styles/house-stats.css')


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
            var picker = new Pikaday({ field: document.getElementById(`datePicker${index}`) });
            // listens for the save event, after the edit event
            document.getElementById(element.id).addEventListener('click', (event) => {
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

const divideTheExpenses = () => {
    const expenses = lotsOfBills.map((item) => {
        return item.amount;
    })
    // make dynamic
    const divideAt300Dollars = '300.00'
    const dividedBills = billingSummary(lotsOfBills,
        divideAt300Dollars,
        formatTheMoneyInput(state.getRoommates().length)
    )
    // change the structure to save a roommate to the bill
    // currently saves a duplicate of the bills for each roommate
    let saved = state.saveExpensesToRoommate(dividedBills);
    return saved;
}

const createHtml = () => {
    return divideTheExpenses().map((arr) => {
        return EXPENSE_DIVIDED_HTML(arr.bills, arr.name);
    })
}

const renderExpenseSummary = () => {
    if (state.getExpenses().length >= 1 && state.getRoommates().length > 1) {
        const summaryContainer = document.getElementById('expense-summary-container');
        summaryContainer.innerHTML = createHtml().join('');
    }
}

const renderPage = (lotsOfBills) => {
    if (window.innerWidth <= '375') {
        renderMenuBtn();
        watchMobileSummaryBtn();
        watchMobileAllExpenseBtn();
    } else {
        renderExpenseSummary();
        renderTableData(lotsOfBills);

    }
}

// for mobile users
const renderMenuBtn = () => {
    const mobileMenuDiv = document.getElementById('mobile-menu')
    mobileMenuDiv.innerHTML = menuBtnHtml();
}

const menuBtnHtml = () => {
    return `<button type="button" id="all-expenses" class="btn">${'All Expenses'}</button>
            <button typ="button" id="roommate-summary" class="btn">${'Amount Due'}</button>`
}

const watchMobileSummaryBtn = () => {
    const roommateSummaryBtn = document.getElementById('roommate-summary');
    const allBillsContentArea = document.getElementsByClassName('all-expenses-rendering');
    console.log(allBillsContentArea)
    roommateSummaryBtn.addEventListener('click', (e) => {
        Array.from(allBillsContentArea).forEach((item) => {
            item.parentNode.removeChild(item);
        })
        renderExpenseSummary();
    })
}

const watchMobileAllExpenseBtn = () => {
    const allExpensesBtn = document.getElementById('all-expenses');
    const expensesByRoommateArea = document.getElementsByClassName('each-roommate-expense-js')
    allExpensesBtn.addEventListener('click', (e) => {
        Array.from(expensesByRoommateArea).forEach((item) => {
            item.parentNode.removeChild(item);
        })
        renderTableData(lotsOfBills);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    renderPage(lotsOfBills);
});
