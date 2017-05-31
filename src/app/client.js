const HouseHolds = require('./mock-model');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)));


//set content editable when button is pushed
let htmlString = (item, index) => {
    return `<tr><td contenteditable="true">${item.name}</td>` +
        `<td>${item.dueDate}</td>` +
        `<td contenteditable="true">${item.amount}</td>` +
        `<td>${item.users[0].roommates_id}<span> paid it on: ${item.lastPaidOn}</span></td>` +
        `<td><button id="edit-${index}-js" class="btn btn-sm">Edit</button></td>` +
        `</tr>`
}

let buildTable = (bills) => {
    return bills.map((item, index) => {
        return htmlString(item, index);
    })
}

let tableToString = (bills) => {
    let tableString = buildTable(bills).join('')
    return tableString;
}

let getTableBodyId = () => {
    return document.getElementById('main-content-js');
}

let renderTableData = (bills) => {
    return getTableBodyId().insertAdjacentHTML('beforeend', tableToString(bills));
}

document.addEventListener('DOMContentLoaded', () => {
    renderTableData(lotsOfBills)
    // event handler for later
    getTableBodyId().onclick = (e) => {
        let index = e.target.id.substring(5, 6);
        index = parseInt(index);
    }
});
