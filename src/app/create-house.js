const CreateHouseState = require('./manage-state');
const Pikaday = require('pikaday');
require('pikaday/css/pikaday.css');
require('../styles/create-house.css');
const HouseHold = require('./mock-model');
const { saveHouseHold, createDemoHouse } = require('./api');
/* global document, window, location */

const state = new CreateHouseState();

const renderHouseName = () => {
  const houseHoldName = document.getElementById('household-name');
  if (state.getHouseName() !== '') {
    houseHoldName.value = state.getHouseName();
  }
};

// roommate rendered and saved to state
const roommateHtml = (roommate, index) => `<li class="rendered-list">${roommate.name} 
                <button class="btn btn-sm btn-primary delete-btn-js rendered-roommate-btn" id="roommate-${index}">Delete</button>
            </li>`;

const renderRoommateList = () => {
  const roommateContainer = document.getElementById('add-roommate');
  roommateContainer.innerHTML = listToString(state.getRoommates(), roommateHtml);
  document.getElementById('add-roommate-form').reset();

  watchDeleteRoommate();
};

const watchRoommateBtn = () => {
  const addRoommateBtn = document.getElementById('add-roommate-form');

  addRoommateBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.getElementsByName('create-roommate')[0].value;

    state.addRoommate(value);

    render();
  });
};

let watchDeleteRoommate = () => {
  const deleteBtn = document.getElementsByClassName('delete-btn-js');
  const trimIdString = 9;

  Array.from(deleteBtn).forEach((item) => {
    item.addEventListener('click', (e) => {
      const index = e.target.id.substring(trimIdString);
      state.removeRoommate(index);
      render();
    });
  });
};

// ***************************************************************
// used in both expense and roommate render
let listToString = (list, callback) => {
  const newList = list.map((item, index) => callback(item, index));
  return newList.join('');
};

// *******************************************
// expenses rendered and saved to state
const partialExpenseTableHtml = () => `<div class="expense-table-container">
                <table class="table table-condensed">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody id="expense-table">

                    </tbody>
                </table>
            </div>`;

const expenseTableHtml = (expense, index) => `<tr>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.dueDate}</td>
                <td>
                    <button class="btn btn-sm btn-primary delete-expense-btn-js" id="expense-${index}">Delete</button>
                </td>
            </tr>`;

const renderExpenseTable = () => {
  const tableContainer = document.getElementById('table-container');

  if (state.getExpenses().length >= 1) {
    tableContainer.innerHTML = partialExpenseTableHtml();
    const expenseTable = document.getElementById('expense-table');
    expenseTable.innerHTML = listToString(state.getExpenses(), expenseTableHtml);
    document.getElementById('add-expense-form').reset();

    watchDeleteExpenseBtn();
  } else {
    tableContainer.innerHTML = '';
  }
};

const watchExpenseBtn = () => {
  const addBillBtn = document.getElementById('add-expense-form');
  const picker = new Pikaday({ field: document.querySelector('[name=dueDate]') });

  addBillBtn.addEventListener('submit', (e) => {
    e.preventDefault();

    const expenseObject = {
      name: e.target.name.value,
      dueDate: e.target.dueDate.value,
      amount: e.target.amount.value,
    };

    state.addExpenseToState(expenseObject);
    const mobile = 'expenses';
    render(mobile);
  });
};

let watchDeleteExpenseBtn = () => {
  const deleteBtn = document.getElementsByClassName('delete-expense-btn-js');
  const trimIdString = 8;
  Array.from(deleteBtn).forEach((item) => {
    item.addEventListener('click', (e) => {
      const index = e.target.id.substring(trimIdString);
      state.removeExpense(index);
      render();
    });
  });
};

// ****************************************
// rendering for household submission
const submitHtml = () => `<button class="btn btn-primary" id="submit-household-btn">
                Submit Houshold
            </button>`;

const watchSubmitHousehold = () => {
  const submitHouseBtn = document.getElementById('submit-household-btn');
  submitHouseBtn.addEventListener('click', (e) => {
    const householdName = document.getElementById('household-name');
    state.setHouseName(householdName.value);

    saveHouseHold(state.getHouseHold());

    location.href = '/house-stats';
  });
};

const renderSubmitHousehold = () => {
  const submitHouseContainer = document.getElementById('submit-household');
  submitHouseContainer.innerHTML = '';
  if (state.readyForSubmit()) {
    submitHouseContainer.innerHTML = submitHtml();
    watchSubmitHousehold();
  }
};

const renderAddRoommateContainer = () => {
  const roommateRow = document.getElementById('roommate-row');
  roommateRow.innerHTML = addRoommateContainerHtml();
};

const addRoommateContainerHtml = () => `<div id="roommate-form"> 
            <div class="col-md-4">
                <h6 class="text-center">Add a Roommate Below</h6>
                    <div class="form-container">
                        <form action="" id="add-roommate-form">
                            <div class="form-group">
                                <label class="control-label" for="create-roommate">Roommate</label>
                                <input class="form-control input-style" type="text" name="create-roommate">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input id="add-roommate-btn input-style" name="create-roommate" class="btn btn-primary" type="submit" value="Save">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6 rendered-area">
                    <h5>Roommates</h5>
                    <hr>
                    <ol id="add-roommate">
                    </ol>
                </div>
            </div>`;

const renderAddExpenseContainer = () => {
  const addExpenseRow = document.getElementById('add-expense-row');
  addExpenseRow.innerHTML = addExpenseContainerHtml();
};

const addExpenseContainerHtml = () => `<div id="expense-form">
            <div class="col-md-4">
                <h6 class="text-center">Enter a new Expense below</h6>
                    <div class="form-container">
                        <form action="" id="add-expense-form">
                            <div class="form-group">
                                <label class="control-label" for="name">Name</label>
                                <input class="form-control input-style" type="text" name="name" placeholder="electric">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="due-date">Due Date</label>
                                <input class="form-control input-style" type="text" name="dueDate" placeholder="MM/DD/YYYY">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="amount">Amount</label>
                                <input class="form-control input-style" type="text" name="amount" placeholder="100.32">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input id="expense-btn" name="create-expense" class="btn btn-primary input-style" type="submit" value="Save">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="rendered-area">
                            <h5>Expenses</h5>
                            <hr>
                        </div>
                        <div id="table-container">

                        </div>
                    </div>
                </div>
            </div>`;

// mobile rendering
const mobileNavButtonsHtml = () => `<button id="add-roommates-btn" class="btn btn-primary" type="button">Add Roommates</button>
            <button id="add-expenses-btn" class="btn btn-primary" type="button">Add Expenses</button>`;

const renderMobileNav = () => {
  const mobileNavRenderArea = document.getElementById('mobile-nav-render-area');
  mobileNavRenderArea.innerHTML = mobileNavButtonsHtml();
};

const watchAddRoommatesBtn = () => {
  const addRoommates = document.getElementById('add-roommates-btn');
  addRoommates.addEventListener('click', () => {
    const addExpenses = document.getElementById('expense-form');
    addExpenses.parentNode.removeChild(addExpenses);
    render();
  });
};

const watchAddExpensesBtn = () => {
  const addExpenses = document.getElementById('add-expenses-btn');
  addExpenses.addEventListener('click', () => {
    const addRoommate = document.getElementById('roommate-form');
    addRoommate.parentNode.removeChild(addRoommate);
    const mobile = 'expenses';
    render(mobile);
  });
};

// check calls to mobile, refactor this
let render = (mobile = '') => {
  if (window.innerWidth <= '1000') {
    renderMobileNav();
    watchAddRoommatesBtn();
    watchAddExpensesBtn();
    if (mobile === 'expenses') {
      renderAddExpenseContainer();
      renderExpenseTable();
      watchExpenseBtn();
    } else {
      renderAddRoommateContainer();
      renderRoommateList();
      watchRoommateBtn();
    }
    renderHouseName();
    renderSubmitHousehold();
  } else {
    renderAddExpenseContainer();
    renderAddRoommateContainer();
    renderRoommateList();
    renderExpenseTable();
    renderSubmitHousehold();
    renderHouseName();
    watchRoommateBtn();
    watchExpenseBtn();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  state.setHouseHold(createDemoHouse());
  render();
});
