/* global document window location */

// Templates
const HOUSE_HTML = require('../templates/house-stats-form.pug');
const EXPENSE_DIVIDED_HTML = require('../templates/expenses-divided.pug');
const AllExpensesExplained = require('../templates/expense-data-explained.pug');
const RoommateExpenseExplained = require('../templates/roommate-expenses-explained.pug');
const MobileNav = require('../templates/mobile-nav.pug');
const createRoommate = require('../templates/create-roommate.pug');

// JS
const CreateHouseState = require('./manage-state');
const { billingSummary } = require('./divide-expenses');
const {
  getHouseHold,
  removeExpense,
  editExpense,
  addRoommate,
  saveNewExpense,
  editRoommate,
  removeRoommate,
} = require('./api');
const { formatTheMoneyInput } = require('./formatting');
const Pikaday = require('pikaday');

// css
require('pikaday/css/pikaday.css');
require('../styles/house-stats.css');

const state = new CreateHouseState();

const pipe = (...pipeline) => input => pipeline.reduce((acc, fn) => fn(acc), input);

// add a date picker to editable expenses
const addDatePicker = () => {
  const listOfEditableExpenses = document.querySelectorAll('input:read-write');

  if (listOfEditableExpenses.length > 0) {
    listOfEditableExpenses.forEach((element) => {
      element.classList.forEach((item) => {
        if (item === 'add-picker') {
          let picker = new Pikaday({ field: element });
        }
      });
    });
  }
};

// ************************************
// initial render
const buildTable = () => state
  .getExpenses()
  .map((item, index) => HOUSE_HTML({ item: item, index }));

const tableToString = () => buildTable(state.getExpenses()).join('');

const getTableBodyId = () => document.getElementById('main-content-js');

const renderTableData = (expense = '') => {
  getTableBodyId().innerHTML = tableToString(expense);
  addDatePicker();
  watchDelete();
  watchEdit();
};

// **********************************
// add, edit or remove roommate
const saveOrEditBtnClass = () => document.getElementsByClassName('save-or-edit');

const saveOrEditRoommate = (index) => {
  const newRoomateInfo = document.getElementById(`focus-${index}`).value;
  if (state.getRoommates()[index].newRoommate) {
    state.getRoommates()[index].newRoommate = false;
    state.getRoommates()[index].name = newRoomateInfo;
    state.getRoommates()[index].editable = false;
    addRoommate(state.getRoommates()[index], state.getSlug())
      .then(divideTheExpenses)
      .then(() => renderPage('summary'));
  } else {
    state.getRoommates()[index].name = newRoomateInfo;
    state.getRoommates()[index].editable = false;
    editRoommate(state.getRoommates()[index], state.getSlug())
      .then(divideTheExpenses)
      .then(() => renderPage('summary'));
  }
};

const setRoomateEditable = () => {
  Array.from(saveOrEditBtnClass()).forEach((element) => {
    element.addEventListener('click', (e) => {
      const index = parseInt(e.target.id);
      if (state.getRoommates()[index].editable) {
        saveOrEditRoommate(index);
      } else {
        state.getRoommates()[index].editable = true;
        renderPage('summary');
        document.getElementById(`focus-${index}`).focus();
      }
    });
  });
};

const addNewRoommate = () => {
  const roommateBtn = document.getElementById('add-roommate');
  roommateBtn.addEventListener('click', () => {
    state.addEmptyRoommate();
    divideTheExpenses();
    renderPage('summary');
    document.getElementById(`focus-${state.getRoommates().length - 1}`).focus();
  });
};

const watchRemoveRoommate = () => {
  const removeRoommateBtn = document.getElementsByClassName('remove-roommate-js');
  Array.from(removeRoommateBtn).forEach((element) => {
    element.addEventListener('click', (e) => {
      const roommateObj = state.getRoommateByName(e.target.id);
      state.removeRoommateByName(roommateObj.name);
      removeRoommate(roommateObj, state.getSlug()).then(divideTheExpenses).then(() => renderPage('summary'));
    });
  });
};

// *********************************
// edit delete or add expenses
const isEditable = (index) => {
  if (state.getExpenses()[index].editable) {
    return false;
  }
  return true;
};

const getDeleteElementIndex = e => parseInt(e.target.id.substring(7));

const getEditElementIndex = (actionType, id) => parseInt(id.substring(10));

const preventDefault = (e) => { e.preventDefault(); return e; };

const preventAndGetIndex = pipe(preventDefault, getDeleteElementIndex);

const watchDelete = () => {
  const deleteBtnHandler = pipe(preventAndGetIndex, removeExpenseFromState);
  const deleteButton = document.getElementsByClassName('delete-expense-js');
  Array.from(deleteButton).forEach((element) => {
    element.addEventListener('click', deleteBtnHandler);
  });
};

let watchEdit = () => {
  const editOrDeleteButton = document.getElementsByClassName('watch-js');
  Array.from(editOrDeleteButton).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const targetElement = e.target;
      const index = getEditElementIndex(targetElement.value, targetElement.id);
      if (state.getExpenses()[index].editable) {
        state.getExpenses()[index].editable = isEditable(index);
        setEditedRow(e, index);
      } else {
        state.getExpenses()[index].editable = isEditable(index);
        renderPage();
      }
    });
  });
};

const removeExpenseFromState = (index) => {
  const removedObj = state.getOneExpense(index);
  state.removeExpense(index);
  removeExpense(removedObj, state.getSlug())
    .then(divideTheExpenses)
    .then(renderPage);
};

let setEditedRow = (e, i) => {
  const data = e.target.parentNode.parentNode.getElementsByTagName('input');
  const dataObj = {
    name: data.name.value,
    dueDate: data.dueDate.value,
    amount: data.amount.value,
  };
  if (state.getOneExpense(i).newExpense === true) {
    state.getOneExpense(i).newExpense = false;
    state.editExpense(dataObj, i);
    saveNewExpense(state.getOneExpense(i), state.getSlug())
      .then(divideTheExpenses)
      .then(renderPage);
  } else {
    state.editExpense(dataObj, i);
    editExpense(state.getOneExpense(i), state.getSlug()).then(divideTheExpenses).then(renderPage);
  }
};

const watchAddExpenses = () => {
  const addExpense = document.getElementById('add-expense');

  addExpense.addEventListener('click', () => {
    state.addEmptyExpense();
    const index = state.getExpenses().length - 1;
    renderPage();
  });
};

// ***************************************
// divide expenses to roommates and create a table showing the results
const divideTheExpenses = () => {
  // todo make dynamic
  const divideAt300Dollars = '100.00';
  const dividedBills = billingSummary(state.getExpenses(),
    divideAt300Dollars,
    formatTheMoneyInput(state.getRoommates().length),
  );
  state.saveExpensesToRoommate(dividedBills);
};

const createDividedExpenseHtml = () =>
  state.getRoommates().map((arr, index) =>
    EXPENSE_DIVIDED_HTML({ list: arr.bills, name: arr.name, editable: arr.editable, index }));

const renderExpenseSummary = () => {
  if (state.getExpenses().length >= 1 && state.getRoommates().length > 1) {
    const summaryContainer = document.getElementById('expense-summary-container');
    summaryContainer.innerHTML = createDividedExpenseHtml().join('');
    watchRemoveRoommate();
    setRoomateEditable();
  }
};

// **********************************
// main render
const renderPage = (mobile = '') => {
  removeHtml();
  console.log(mobile);
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
};

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

// ************************
// unique house hold link rendered
const renderUserLink = () => {
  const userLinkId = document.getElementById('unique-url');
  userLinkId.innerHTML = `<a href="${location}"><h4>${location}</h4></a>`;
};

// todo fix path name error with demo
document.addEventListener('DOMContentLoaded', () => {
  renderUserLink();
  const path = location.pathname.replace('/house-stats/', '');
  watchAddExpenses();
  addNewRoommate();
  getHouseHold(path)
    .then((house) => {
      state.setHouseHold(house);
    })
    .then(divideTheExpenses)
    .then(renderPage);
});
