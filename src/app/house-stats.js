
// Templates
const HOUSE_HTML = require('../templates/house-stats-form.pug');
const EXPENSE_DIVIDED_HTML = require('../templates/expenses-divided.pug');
const AllExpensesExplained = require('../templates/expense-data-explained.pug');
const RoommateExpenseExplained = require('../templates/roommate-expenses-explained.pug');
const MobileNav = require('../templates/mobile-nav.pug');

// JS
const CreateHouseState = require('./manage-state');
const { billingSummary } = require('./divide-expenses');
const { getHouseHold, saveHouseHold, editExpense, addOrEditRoommatesBills } = require('./api');
const { formatTheMoneyInput } = require('./formatting');
const Pikaday = require('pikaday');

// css
require('pikaday/css/pikaday.css');
require('../styles/house-stats.css');

/* global document window */

const state = new CreateHouseState();

const buildTable = () => state
  .getExpenses()
  .map((item, index) => HOUSE_HTML({ item: item, index }));

const tableToString = () => buildTable(state.getExpenses()).join('');

const getTableBodyId = () => document.getElementById('main-content-js');

const renderTableData = () => {
  getTableBodyId().innerHTML = tableToString(state.getExpenses());
  return watchEdit();
};

const isEditable = (index) => {
  if (state.getExpenses()[index].editable) {
    return false;
  }
  return true;

};

let watchEdit = () => {
  const editButton = document.getElementsByClassName('watch-js');

  Array.from(editButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = e.target;
      let index = targetElement.id.substring(10);
      index = parseInt(index);
      state.getExpenses()[index].editable = isEditable(index);
      renderPage();
      let picker = new Pikaday({ field: document.getElementById(`datePicker${index}`) });
      // listens for the save event, after the edit event
      document.getElementById(element.id).addEventListener('click', (event) => {
        setEditedRow(event, index);
      });
    });
  });
};

let setEditedRow = (e, i) => {
  const data = e.target.parentNode.parentNode.getElementsByTagName('input');
  const dataObj = {
    name: data.name.value,
    dueDate: data.dueDate.value,
    amount: data.amount.value,
  };
  state.editExpense(dataObj, i);
  editExpense(state.getOneExpense(i), i).then(divideTheExpenses).then(renderPage);
};

const divideTheExpenses = () => {
  const expenses = state.getExpenses().map(item => item.amount);
  // make dynamic
  const divideAt300Dollars = '300.00';
  const dividedBills = billingSummary(state.getExpenses(),
    divideAt300Dollars,
    formatTheMoneyInput(state.getRoommates().length),
  );
  // change the structure to save a roommate to the bill
  // currently saves a duplicate of the bills for each roommate
  addOrEditRoommatesBills(dividedBills).then((roommates) => {
    state.saveExpensesToRoommate(roommates);
  });
};

const createHtml = () => state.getRoommates().map((arr) => {
  return EXPENSE_DIVIDED_HTML({ list: arr.bills, name: arr.name });
});

const renderExpenseSummary = () => {
  if (state.getExpenses().length >= 1 && state.getRoommates().length > 1) {
    const summaryContainer = document.getElementById('expense-summary-container');
    summaryContainer.innerHTML = createHtml().join('');
  }
};

const renderPage = (mobile = '') => {
  if (window.innerWidth <= '1000') {
    renderMenuBtn();
    if (mobile === 'summary') {
      renderExpenseExplained();
      renderExpenseSummary();
    } else {
      renderAllExpensesExplained();
      renderTableData(state.getExpenses());
    }
  } else {
    renderExpenseExplained();
    renderAllExpensesExplained();
    renderExpenseSummary();
    renderTableData(state.getExpenses());
  }
};

const renderAllExpensesExplained = () => {
  const allExpensesExplained = document.getElementById('all-expenses-explained');
  allExpensesExplained.innerHTML = AllExpensesExplained();
};

const renderExpenseExplained = () => {
  const expenseExplained = document.getElementById('roommate-expense-explained');
  expenseExplained.innerHTML = RoommateExpenseExplained();
};

// **************************************
// for mobile users
const renderMenuBtn = () => {
  const mobileMenuDiv = document.getElementById('mobile-menu');
  mobileMenuDiv.innerHTML = MobileNav({ btn1: 'All Expenses', btn2: 'Expenses Divided' });
  watchMobileSummaryBtn();
  watchMobileAllExpenseBtn();
};

const watchMobileSummaryBtn = () => {
  const roommateSummaryBtn = document.getElementById('Expenses-Divided');
  const allBillsContentArea = document.getElementsByClassName('all-expenses-rendering');
  roommateSummaryBtn.addEventListener('click', (e) => {
    // removes all expenses html and the header content
    Array.from(allBillsContentArea).forEach((item) => {
      item.parentNode.removeChild(item);
    });
    const mobile = 'summary';
    renderPage(mobile);
  });
};

const watchMobileAllExpenseBtn = () => {
  const allExpensesBtn = document.getElementById('All-Expenses');
  const expensesByRoommateArea = document.getElementsByClassName('each-roommate-expense-js');
  allExpensesBtn.addEventListener('click', (e) => {
    // removes the headers used to explain the ui content
    // removes expense per roommate html
    Array.from(expensesByRoommateArea).forEach((item) => {
      item.parentNode.removeChild(item);
    });
    renderPage();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getHouseHold().then((house) => {
    state.setHouseHold(house);
  }).then(divideTheExpenses).then(renderPage);
});
