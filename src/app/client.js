const HouseHolds = require('./mock-model');

const idString = "data-container-js";

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

let htmlString = (item, index, editable = ['contenteditable=', false]) => {
    let contentEditable = item.editable ? 'contenteditable=true' : 'contenteditable=false';
    return `<tr><td ${contentEditable}>${item.name}</td>` +
        `<td>${item.dueDate}</td>` +
        `<td ${contentEditable}>${item.amount}</td>` +
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
    return getTableBodyId().innerHTML = tableToString(bills);
}

let watchEdit = () => {
    getTableBodyId().onclick = (e) => {
        let element = e.target
        let index = element.id.substring(5, 6);
        index = parseInt(index);
        lotsOfBills[index].editable = true;
        renderTableData(lotsOfBills);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTableData(lotsOfBills);

    watchEdit();
});
