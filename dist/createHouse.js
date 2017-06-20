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
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ({

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var state = {
    roommates: [],
    expenses: []
};

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
        if (value.name !== '') {
            state.roommates.push(value);
        }

        renderRoommateList();
    });
};

var watchDeleteRoommate = function watchDeleteRoommate() {
    var deleteBtn = document.getElementsByClassName('delete-btn-js');

    // refactor used in two places
    Array.from(deleteBtn).forEach(function (item) {
        item.addEventListener('click', function (e) {
            var index = e.target.id.substring(9);
            state.roommates.splice(index, 1);
            renderRoommateList();
        });
    });
};

// used in both expense and roommate render, callback returns html
var listToString = function listToString(list, callback) {
    var newList = list.map(function (item, index) {
        return callback(item, index);
    });
    return newList.join('');
};

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
    watchDeleteExpenseBtn();
};

var watchExpenseBtn = function watchExpenseBtn() {
    var addBillBtn = document.getElementById('add-expense-form');
    var expenseData = document.getElementsByName('create-expense');

    addBillBtn.addEventListener('submit', function (e) {
        e.preventDefault();
        var expense = {
            name: expenseData[0].value,
            amount: expenseData[1].value,
            dueDate: expenseData[2].value
        };
        state.expenses.push(expense);

        renderExpenseTable();
    });
};

var watchDeleteExpenseBtn = function watchDeleteExpenseBtn() {
    var deleteBtn = document.getElementsByClassName('delete-expense-btn-js');

    // refactor this used here and delete roommate btn
    Array.from(deleteBtn).forEach(function (item) {
        item.addEventListener('click', function (e) {
            var index = e.target.id.substring(8);
            console.log(index);
            state.roommates.splice(index, 1);
            console.log(state.expenses.splice(index, 1));
            renderExpenseTable();
        });
    });
};

document.addEventListener('DOMContentLoaded', function () {
    watchRoommateBtn();
    watchExpenseBtn();
});

/***/ })

/******/ });
//# sourceMappingURL=createHouse.js.map