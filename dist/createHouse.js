/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 94);
/******/ })
/************************************************************************/
/******/ ({

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var state = {
    roommates: [],
    expenses: [],

    addRoommate: function addRoommate(data) {
        var validData = isValidRoommate(data);
        if (validData.isValid) {
            state.roommates.push(data);
        }
        return state;
    },

    removeRoommate: function removeRoommate(index) {
        state.roommates.splice(index, 1);
        return state;
    },

    addExpenseToState: function addExpenseToState(expenses) {
        var name = isValidExpenseName(expenses[0]);
        var number = isValidExpenseAmount(expenses[1]);
        console.log(number.isValid);
        if (name.isValid && number.isValid) {
            var expense = {
                name: expenses[0],
                amount: expenses[1],
                dueDate: expenses[2]
            };
            state.expenses.push(expense);
            return state;
        }
    },

    removeExpense: function removeExpense(index) {
        state.expenses.splice(index, 1);
        return state;
    }
};

module.exports = { state: state };

// move validation
var isValidRoommate = function isValidRoommate(roommate) {
    var errors = [];
    if (roommate.name === '') {
        errors.push('The roommate should have a name');
    }
    if (errors.length > 0) {
        return {
            isValid: false, errors: errors
        };
    } else {
        return {
            isValid: true
        };
    }
};

var isValidExpenseName = function isValidExpenseName(expense) {
    var errors = [];
    if (expense === '') {
        errors.push('The expense should have a name');
    }
    if (errors.length > 0) {
        return {
            isValid: false, errors: errors
        };
    } else {
        return {
            isValid: true
        };
    }
};

var isValidExpenseAmount = function isValidExpenseAmount(expense) {
    var amount = parseFloat(expense);
    if (!Number.isNaN(amount)) {
        return {
            isValid: true
        };
    } else {
        return {
            isValid: false
        };
    }
};

var isValidExpenseDate = function isValidExpenseDate(expense) {};

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(84),
    state = _require.state;

// roommate rendered and saved to state


var roommateHtml = function roommateHtml(roommate, index) {
    return '<li>' + roommate.name + ' \n                <button class="btn btn-sm delete-btn-js" id="roommate-' + index + '">Delete</button>\n            </li>';
};

var renderRoommateList = function renderRoommateList() {
    var roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = listToString(state.roommates, roommateHtml);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
};

var watchRoommateBtn = function watchRoommateBtn() {
    var addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = { name: document.getElementsByName('create-roommate')[0].value };

        state.addRoommate(value);

        renderRoommateList();
    });
};

var watchDeleteRoommate = function watchDeleteRoommate() {
    var deleteBtn = document.getElementsByClassName('delete-btn-js');
    var trimIdString = 9;
    addListenerByClassName(deleteBtn, trimIdString, state.removeRoommate, renderRoommateList);
};

// ***************************************************************
// used in both expense and roommate render
var listToString = function listToString(list, callback) {
    var newList = list.map(function (item, index) {
        return callback(item, index);
    });
    return newList.join('');
};

var addListenerByClassName = function addListenerByClassName(classNames, trimIndex, list, callback) {
    Array.from(classNames).forEach(function (item) {
        item.addEventListener('click', function (e) {
            var index = e.target.id.substring(trimIndex);
            list(index);
            callback();
        });
    });
};

// *******************************************
// expenses rendered and saved to state
var partialExpenseTableHtml = function partialExpenseTableHtml() {
    return '<div class="col-md-6">\n                <table class="table table-condensed">\n                    <thead>\n                        <tr>\n                            <th>Name</th>\n                            <th>Amount</th>\n                            <th>Due Date</th>\n                        </tr>\n                    </thead>\n                    <tbody id="expense-table">\n\n                    </tbody>\n                </table>\n            </div>';
};

var expenseTableHtml = function expenseTableHtml(expense, index) {
    return '<tr>\n                <td>' + expense.name + '</td>\n                <td>' + expense.amount + '</td>\n                <td>' + expense.dueDate + '</td>\n                <td>\n                    <button class="btn btn-sm delete-expense-btn-js" id="expense-' + index + '">Delete</button>\n                </td>\n            </tr>';
};

var renderExpenseTable = function renderExpenseTable() {
    var tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = partialExpenseTableHtml();
    var expenseTable = document.getElementById('expense-table');
    expenseTable.innerHTML = listToString(state.expenses, expenseTableHtml);
    document.getElementById('add-expense-form').reset();

    watchDeleteExpenseBtn();
};

var watchExpenseBtn = function watchExpenseBtn() {
    var addBillBtn = document.getElementById('add-expense-form');
    var expenseData = document.getElementsByName('create-expense');

    addBillBtn.addEventListener('submit', function (e) {
        e.preventDefault();

        state.addExpenseToState(Array.from(expenseData).map(function (item) {
            return item.value;
        }));

        renderExpenseTable();
    });
};

var watchDeleteExpenseBtn = function watchDeleteExpenseBtn() {
    var deleteBtn = document.getElementsByClassName('delete-expense-btn-js');
    var trimIdString = 8;

    addListenerByClassName(deleteBtn, trimIdString, state.removeExpense, renderExpenseTable);
};

document.addEventListener('DOMContentLoaded', function () {
    watchRoommateBtn();
    watchExpenseBtn();
});

/***/ })

/******/ });
//# sourceMappingURL=createHouse.js.map