const HouseHolds = require('./mock-model');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

let htmlString = (item, index) => {

    let inputReadOnly = item.editable ? ['', 'type="submit"', 'Save'] : ['readonly', '', 'Edit'];
    return `<tr>
             <td>
                <input name="bill" type="text" ${inputReadOnly[0]} value=${item.name}>
            </td>
            <td><input type="date" ${inputReadOnly[0]} value="${item.dueDate}"</td>
            <td>
                <input name="bill" type="text" ${inputReadOnly[0]} value=${item.amount}>
            </td>
            <td>${item.users[0].roommates_id}
                <span> paid it on: 
                    <input type="date" ${inputReadOnly[0]} value="${item.lastPaidOn}">
                </span>
            </td>
            <td>
                <button name="bill" id="edit-${index}-js" ${inputReadOnly[1]} class="watch-js btn btn-primary btn-sm">
                    ${inputReadOnly[2]}
                </button>
            </td>
        </tr>`
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
    getTableBodyId().innerHTML = tableToString(bills);
    return watchEdit();
}

let watchEdit = () => {
    let editButton = document.getElementsByClassName("watch-js");

    Array.from(editButton).forEach(function (element, i, array) {
        element.addEventListener('click', (e) => {
            let element = e.target
            let index = 0;
            if (i <= 9) {
                index = element.id.substring(5, 6);
            } else {
                index = element.id.substring(5, 7);
            }
            index = parseInt(index);
            lotsOfBills[index].editable = isEditable(index);
            setEditedRow(e, index);
            renderTableData(lotsOfBills);
        });
    });
}

let setEditedRow = (e, i) => {
    let data = e.target.parentNode.parentNode.getElementsByTagName('input');

    lotsOfBills[i].name = data[0].value
    lotsOfBills[i].dueDate = data[1].value
    lotsOfBills[i].amount = data[2].value
    lotsOfBills[i].lastPaidOn = data[3].value
}

let isEditable = (index) => {
    if (lotsOfBills[index].editable) {
        return false;
    } else {
        return true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderTableData(lotsOfBills);
});
