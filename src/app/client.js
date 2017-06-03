const HouseHolds = require('./mock-model');

let bills = HouseHolds[0].bills;
let doubleIt = (bills) => bills.concat(bills.slice(0))
let lotsOfBills = doubleIt(doubleIt(doubleIt(bills)))
    .map((e) => Object.assign({}, e, { editable: false }));

let htmlString = (item, index) => {
    let inputReadOnly = item.editable ? ['', 'type="submit"', 'Save'] : ['readonly', '', 'Edit'];
    return `<div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="row">
                    <form action="#" class="form-inline">

                        <div class="col-md-2">
                        <label for="bill">Name</label>
                            <input class="form-control" name="bill" type="text" ${inputReadOnly[0]} value="${item.name}">
                        </div>
                        <div class="col-md-2">
                        <label for="bill"> Date Due</label>
                            <input class="form-control" name="bill" type="date" ${inputReadOnly[0]} value="${item.dueDate}">
                        </div>
                       
                        <div class="col-md-2">
                         <label for="bill">Amount</label>
                            <input class="form-control" name="bill" type="text" ${inputReadOnly[0]} value="${item.amount}">
                        </div>
                        
                        <div class="col-md-2">
                        <label for="bill">Who paid it:</label>
                            <input class="form-control" name="bill" type="text" value="${item.users[0].roommates_id}">
                        </div>
                        
                        <div  class="col-md-2">
                        <label for="bill">Paid On:</label>
                            <input class="form-control" name="bill" type="date" ${inputReadOnly[0]} value="${item.lastPaidOn}">
                        </div>

                        <div class="col-md-2">
                        <span></span>
                            <button name="bill" id="edit-${index}-js" ${inputReadOnly[1]} class="watch-js btn btn-primary btn-sm">
                            ${inputReadOnly[2]}
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>`
}

let buildTable = (bills) => bills.map((item, index) => htmlString(item, index));

let tableToString = (bills) => buildTable(bills).join('');

let getTableBodyId = () => document.getElementById('main-content-js');

let renderTableData = (bills) => {
    getTableBodyId().innerHTML = tableToString(bills);
    return watchEdit();
}

let watchEdit = () => {
    let editButton = document.getElementsByClassName("watch-js");

    Array.from(editButton).forEach(function (element, i, array) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
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
    // console.log(e.target.parentNode.parentNode);
    console.log(data);

    lotsOfBills[i].name = data[0].value
    lotsOfBills[i].dueDate = data[1].value
    lotsOfBills[i].amount = data[2].value
    // lotsOfBills[i].users.push(lotsOfBills[i].users.find((data[3].value)))
    lotsOfBills[i].lastPaidOn = data[4].value
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
