/* global document window */

// Templates
const HOUSE_HTML = require('../templates/house-stats-form.pug');
const EXPENSE_DIVIDED_HTML = require('../templates/expenses-divided.pug');
const AllExpensesExplained = require('../templates/expense-data-explained.pug');
const RoommateExpenseExplained = require('../templates/roommate-expenses-explained.pug');
const MobileNav = require('../templates/mobile-nav.pug');

// JS
const CreateHouseState = require('./manage-state');
const { billingSummary } = require('./divide-expenses');
const {
  getHouseHold,
  removeExpense,
  editExpense,
  addOrEditRoommatesBills,
} = require('./api');
const { formatTheMoneyInput } = require('./formatting');
const Pikaday = require('pikaday');

// css
require('pikaday/css/pikaday.css');
require('../styles/house-stats.css');

const state = new CreateHouseState();

// ************************************
// initial render
const buildTable = () => state
  .getExpenses()
  .map((item, index) => HOUSE_HTML({ item: item, index }));

const tableToString = () => buildTable(state.getExpenses()).join('');

const getTableBodyId = () => document.getElementById('main-content-js');

const renderTableData = (expense = '') => {
  getTableBodyId().innerHTML = tableToString(expense);
  return watchEdit();
};

// *********************************
// edit delete or add expenses
const isEditable = (index) => {
  if (state.getExpenses()[index].editable) {
    return false;
  }
  return true;
};

const getEditOrDeleteElementIndex = (actionType, id) => {
  if (actionType === 'Delete') {
    return parseInt(id.substring(7));
  }
  return parseInt(id.substring(10));
};

let watchEdit = () => {
  const editOrDeleteButton = document.getElementsByClassName('watch-js');

  Array.from(editOrDeleteButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = e.target;
      const index = getEditOrDeleteElementIndex(targetElement.value, targetElement.id);
      if (targetElement.value === 'Delete') {
        removeExpenseFromState(index);
      } else if (state.getExpenses()[index].editable) {
        state.getExpenses()[index].editable = isEditable(index);
        setEditedRow(e, index);
      } else {
        state.getExpenses()[index].editable = isEditable(index);
        renderPage();
        let picker = new Pikaday({ field: document.getElementById(`datePicker${index}`) });
      }
    });
  });
};

const removeExpenseFromState = (index) => {
  state.removeExpense(index);
  removeExpense(index).then(divideTheExpenses).then(renderPage);
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

const watchAddExpenses = () => {
  const addExpense = document.getElementById('add-expense');

  addExpense.addEventListener('click', () => {
    state.addEmptyExpense();
    renderPage();
    const index = state.getExpenses().length - 1;
    let picker = new Pikaday({ field: document.getElementById(`datePicker${index}`) });
  });
};

// ***************************************
// divide expenses to roommates and create a table showing the results
const divideTheExpenses = () => {
  // todo make sure the following commmented out line doesn't bug
  // const expenses = state.getExpenses().map(item => item.amount);
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

// **********************************
// main render
const renderPage = (mobile = '') => {
  removeHtml();
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

const removeHtml = () => {
  const allBillsContentArea = document.getElementsByClassName('all-expenses-rendering');
  const expensesByRoommateArea = document.getElementsByClassName('each-roommate-expense-js');
  Array.from(allBillsContentArea).forEach((item) => {
    item.parentNode.removeChild(item);
  });
  Array.from(expensesByRoommateArea).forEach((item) => {
    item.parentNode.removeChild(item);
  });
}

const watchMobileSummaryBtn = () => {
  const roommateSummaryBtn = document.getElementById('Expenses-Divided');
  roommateSummaryBtn.addEventListener('click', () => {
    const mobile = 'summary';
    renderPage(mobile);
  });
};

const watchMobileAllExpenseBtn = () => {
  const allExpensesBtn = document.getElementById('All-Expenses');
  allExpensesBtn.addEventListener('click', () => {
    renderPage();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  watchAddExpenses();
  getHouseHold().then((house) => {
    state.setHouseHold(house);
  }).then(divideTheExpenses).then(renderPage);
});
