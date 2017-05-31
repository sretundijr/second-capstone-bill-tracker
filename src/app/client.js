const HouseHolds = require('./mock-model');

console.log(HouseHolds[0].bills[0].name);

var col_1_head = document.getElementById('col-head-1-js');
var col_2_head = document.getElementById('col-head-2-js');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)));
col_1_head.innerHTML = HouseHolds[0].bills[0].name;
col_2_head.innerHTML = HouseHolds[0].bills[0].dueDate;

console.log(lotsOfBills);