
const HOUSE_HTML = require('../templates/house-stats-form.pug');
const EXPENSE_DIVIDED_HTML = require('../templates/expenses-divided.pug');
const AllExpensesExplained = require('../templates/expense-data-explained.pug');
const RoommateExpenseExplained = require('../templates/roommate-expenses-explained.pug');
const MobileNav = require('../templates/mobile-nav.pug');
const CreateHouseState = require('./manage-state');
const { billingSummary } = require('./divide-expenses');
const { getHousHold, saveHouseHold } = require('./api');
const { formatTheMoneyInput } = require('./formatting');
const Pikaday = require('pikaday');

require('pikaday/css/pikaday.css');
require('../styles/house-stats.css');

/* global document */

const state = new CreateHouseState();

state.setHouseHold(getHousHold());
// state.setHouseHold(HouseHolds);

const bills = state.getExpenses();
const lotsOfBills = bills;

const buildTable = () => bills.map((item, index) => HOUSE_HTML({ item: item, index }));

const tableToString = () => buildTable(bills).join('');

const getTableBodyId = () => document.getElementById('main-content-js');

const renderTableData = () => {
  getTableBodyId().innerHTML = tableToString(bills);
  return watchEdit();
};

const isEditable = (index) => {
  if (lotsOfBills[index].editable) {
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
      lotsOfBills[index].editable = isEditable(index);
      renderPage(lotsOfBills);
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

  renderPage(state.getExpenses());
};

const divideTheExpenses = () => {
  const expenses = lotsOfBills.map(item => item.amount);
  // make dynamic
  const divideAt300Dollars = '300.00';
  const dividedBills = billingSummary(lotsOfBills,
    divideAt300Dollars,
    formatTheMoneyInput(state.getRoommates().length),
  );
  // change the structure to save a roommate to the bill
  // currently saves a duplicate of the bills for each roommate
  const saved = state.saveExpensesToRoommate(dividedBills);
  return saved;
};

const createHtml = () => divideTheExpenses().map((arr) => {
  return EXPENSE_DIVIDED_HTML({ list: arr.bills, name: arr.name });
});

const renderExpenseSummary = () => {
  if (state.getExpenses().length >= 1 && state.getRoommates().length > 1) {
    const summaryContainer = document.getElementById('expense-summary-container');
    summaryContainer.innerHTML = createHtml().join('');
  }
};

const renderPage = (lotsOfBills, mobile = '') => {
  if (window.innerWidth <= '1000') {
    renderMenuBtn();
    if (mobile === 'summary') {
      renderExpenseExplained();
      renderExpenseSummary();
    } else {
      renderAllExpensesExplained();
      renderTableData(lotsOfBills);
    }
  } else {
    renderExpenseExplained();
    renderAllExpensesExplained();
    renderExpenseSummary();
    renderTableData(lotsOfBills);
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

// for mobile users
const renderMenuBtn = () => {
  const mobileMenuDiv = document.getElementById('mobile-menu');
  mobileMenuDiv.innerHTML = MobileNav({ btn1: 'All Expenses', btn2: 'Expenses Divided By Roommate' });
  watchMobileSummaryBtn();
  watchMobileAllExpenseBtn();
};

const watchMobileSummaryBtn = () => {
  const roommateSummaryBtn = document.getElementById('Expenses-Divided-By-Roommate');
  const allBillsContentArea = document.getElementsByClassName('all-expenses-rendering');
  roommateSummaryBtn.addEventListener('click', (e) => {
    // removes all expenses html and the header content
    Array.from(allBillsContentArea).forEach((item) => {
      item.parentNode.removeChild(item);
    });
    const mobile = 'summary';
    renderPage(lotsOfBills, mobile);
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
    renderPage(lotsOfBills);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderPage(lotsOfBills);
});
