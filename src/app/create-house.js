
// js
const CreateHouseState = require('./manage-state');
const Pikaday = require('pikaday');
const HouseHold = require('./mock-model');
const { getHouseHold, saveHouseHold, createDemoHouse } = require('./api');
const { AddRoommateForm, RoommateList } = require('./create-roommate.js');
const {
  CreateExpenseForm,
  CreatePartialExpenseTable,
  CreateExpenseTable,
} = require('./create-expense');

// templates
const MobileNav = require('../templates/mobile-nav.pug');

// css
require('pikaday/css/pikaday.css');
require('../styles/create-house.css');

/* global document, window, location */

const state = new CreateHouseState();

const renderHouseName = () => {
  const houseHoldName = document.getElementById('household-name');
  if (state.getHouseName() !== '') {
    houseHoldName.value = state.getHouseName();
  }
};

// *************************************
// roommate rendered and saved to state
const renderRoommateList = () => {
  const roommateContainer = document.getElementById('add-roommate');
  roommateContainer.innerHTML = RoommateList({ roommates: state.getRoommates() });
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

// *******************************************
// expenses rendered and saved to state
const renderExpenseTable = () => {
  const tableContainer = document.getElementById('table-container');

  if (state.getExpenses().length >= 1) {
    tableContainer.innerHTML = CreatePartialExpenseTable();
    const expenseTable = document.getElementById('expense-table');
    expenseTable.innerHTML = CreateExpenseTable(state.getExpenses());

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
const submitHtml = () => `<h5 class="text-center">Your household is ready to submit. You can continue to add roommates and expenses or submit now.</h5>
            <button class="btn btn-primary submit-btn" id="submit-household-btn">
                Submit Houshold
            </button>`;

const watchSubmitHousehold = () => {
  const submitHouseBtn = document.getElementById('submit-household-btn');
  submitHouseBtn.addEventListener('click', (e) => {
    const householdName = document.getElementById('household-name');
    state.setHouseName(householdName.value);

    saveHouseHold(state.getHouseHold()).then((house) => {
      state.setHouseHold(house);
    }).then(() => {
      location.href = '/house-stats';
    });
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
  roommateRow.innerHTML = AddRoommateForm();
};

const renderAddExpenseContainer = () => {
  const addExpenseRow = document.getElementById('add-expense-row');
  addExpenseRow.innerHTML = CreateExpenseForm();
};

// *****************************
// mobile rendering
const renderMobileNav = () => {
  const mobileNavRenderArea = document.getElementById('mobile-nav-render-area');
  mobileNavRenderArea.innerHTML = MobileNav({ btn1: 'Add Roommates', btn2: 'Add Expenses' });
};

const watchAddRoommatesBtn = () => {
  const addRoommates = document.getElementById('Add-Roommates');
  addRoommates.addEventListener('click', () => {
    const addExpenses = document.getElementById('expense-form');
    addExpenses.parentNode.removeChild(addExpenses);
    render();
  });
};

const watchAddExpensesBtn = () => {
  const addExpenses = document.getElementById('Add-Expenses');
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

const getValueOrDefault = (defaultValue) => (value) => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return value;
};

document.addEventListener('DOMContentLoaded', () => {
  getHouseHold()
    .then(getValueOrDefault(createDemoHouse()))
    .then(state.setHouseHold)
    .then(render);
});
