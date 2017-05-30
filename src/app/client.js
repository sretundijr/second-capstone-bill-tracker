const HouseHolds = require('./mock-model');

console.log(HouseHolds[0].bills[0].name);

var col_1_head = document.getElementById('col-head-1-js');
var col_2_head = document.getElementById('col-head-2-js');

col_1_head.innerHTML = HouseHolds[0].bills[0].name;
col_2_head.innerHTML = HouseHolds[0].bills[0].dueDate;