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


var roommateHtml = function roommateHtml(roommate, index) {
    return '<li>' + roommate + ' \n                <button class="btn btn-sm delete-btn-js" id="' + index + '">Delete</button>\n            </li>';
};

var roommateListToString = function roommateListToString(roommates) {
    var list = roommates.map(function (item, index) {
        return roommateHtml(item, index);
    });
    return list.join('');
};

var renderRoommateList = function renderRoommateList() {
    var roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = roommateListToString(state.roommates);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
};

var billHtml = function billHtml() {
    return '<div class="col-md-4">\n                    <div class="form-container">\n                        <form action="">\n                            <div class="form-group">\n                                <label class="control-label" for="bill">Name</label>\n                                <input class="form-control" type="text" name="create-house" value="">\n                            </div>\n                            <div class="form-group">\n                                <label class="control-label" for="bill">Amount</label>\n                                <input class="form-control" type="text" name="create-house" value="">\n                            </div>\n                            <div class="form-group">\n                                <label class="control-label" for="bill">Due Date</label>\n                                <input class="form-control" type="text" name="create-house" value="">\n                            </div>\n                            <div class="row">\n                                <div class="col-md-6">\n                                    <div class="form-group">\n                                        <button id="bill-btn" class="btn" type="button">Add a Bill</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </form>\n                    </div>\n                </div>';
};

var state = {
    roommates: [],
    bills: []
};

var watchRoommateBtn = function watchRoommateBtn() {
    var addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', function (e) {
        e.preventDefault();
        state.roommates.push(document.getElementsByName('create-roommate')[0].value);

        renderRoommateList();
    });
};

var watchDeleteRoommate = function watchDeleteRoommate() {
    var deleteBtn = document.getElementsByClassName('delete-btn-js');

    Array.from(deleteBtn).forEach(function (item) {
        item.addEventListener('click', function (e) {
            var index = e.target.id;
            state.roommates.splice(index, 1);
            renderRoommateList(state.roommates);
        });
    });
};

var watchBillBtn = function watchBillBtn() {
    var addBillBtn = document.getElementById('bill-btn');

    addBillBtn.addEventListener('click', function (e) {
        console.log("bill button works too");
    });
};

document.addEventListener('DOMContentLoaded', function () {
    watchRoommateBtn();
    watchBillBtn();
});

/***/ })

/******/ });
//# sourceMappingURL=createHouse.js.map