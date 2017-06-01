const HouseHolds = require('./mock-model');

const idString = "data-container-js";

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)));


//set content editable when button is pushed
let htmlString = (item, index, editable = ['contenteditable=', false]) => {
    return `<tr id="row-${index}-js"><td ${editable.join('')}>${item.name}</td>` +
        `<td>${item.dueDate}</td>` +
        `<td contenteditable="true">${item.amount}</td>` +
        `<td>${item.users[0].roommates_id}<span> paid it on: ${item.lastPaidOn}</span></td>` +
        `<td><button id="edit-${index}-js" class="btn btn-sm">Edit</button></td>` +
        `</tr>`
}

let buildOneRow = (index) => {
    return htmlString(lotsOfBills[index], index, ['contenteditable=', true]);
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

let renderOneRow = (index, id) => {

    let tableData = id.parentNode;
    let tableRow = tableData.parentNode;

    let newNode = document.getElementById(`row-${index}-js`)
    newNode.innerHTML = buildOneRow(index);

    return getTableBodyId().replaceChild(newNode, tableRow)
}

let renderTableData = (bills) => {
    return getTableBodyId().insertAdjacentHTML('beforeend', tableToString(bills));
}

document.addEventListener('DOMContentLoaded', () => {
    renderTableData(lotsOfBills)
    // event handler for later
    getTableBodyId().onclick = (e) => {
        let element = e.target
        let index = element.id.substring(5, 6);
        index = parseInt(index);
        // buildOneRow(index);
        // console.log(element);
        renderOneRow(index, element);
    }
});
