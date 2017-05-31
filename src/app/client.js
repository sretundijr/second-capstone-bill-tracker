const HouseHolds = require('./mock-model');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)));

let htmlString = (item) => {
    return `<tr><td>${item.name}</td>` +
        `<td>${item.dueDate}</td>` +
        `<td>${item.amount}</td>` +
        `<td>${item.users[0].roommates_id}<span> paid it on: ${item.lastPaidOn}</span></td></tr>`
}

let buildTable = (bills) => {
    return bills.map((item) => {
        return htmlString(item);
    })
}

let tableToString = (bills) => {
    let tableString = buildTable(bills).join('')
    return tableString;
}

let renderTableData = (bills) => {
    let mainContent = document.getElementById('main-content-js');
    return mainContent.insertAdjacentHTML('beforeend', tableToString(bills));
}



document.addEventListener('DOMContentLoaded', () => {
    renderTableData(lotsOfBills)
    // event handler for later
    // document.getElementById('main-content-js').onclick = (e) => {
    //     console.log(e);
    // }
});
