let { state } = require('./manage-state')
let HouseHold = require('./mock-model')

// roommate rendered and saved to state
let roommateHtml = (roommate, index) => {
    return `<li>${roommate.name} 
                <button class="btn btn-sm delete-btn-js" id="roommate-${index}">Delete</button>
            </li>`
};

let renderRoommateList = () => {
    let roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = listToString(state.roommates, roommateHtml);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
    renderSubmitHousehold();
};

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        let value = document.getElementsByName('create-roommate')[0].value;

        state.addRoommate(value);

        renderRoommateList();
    })
};

let watchDeleteRoommate = () => {
    let deleteBtn = document.getElementsByClassName('delete-btn-js');
    let trimIdString = 9;
    addListenerByClassName(deleteBtn, trimIdString, state.removeRoommate, renderRoommateList);
};

// ***************************************************************
// used in both expense and roommate render
let listToString = (list, callback) => {
    let newList = list.map((item, index) => {
        return callback(item, index);
    })
    return newList.join('');
};

let addListenerByClassName = (classNames, trimIndex, list, callback) => {
    Array.from(classNames).forEach((item) => {
        item.addEventListener('click', (e) => {
            let index = e.target.id.substring(trimIndex);
            list(index);
            callback();
        })
    })
}

// *******************************************
// expenses rendered and saved to state
let partialExpenseTableHtml = () => {
    return `<div class="col-md-6">
                <table class="table table-condensed">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody id="expense-table">

                    </tbody>
                </table>
            </div>`
};

let expenseTableHtml = (expense, index) => {
    return `<tr>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.dueDate}</td>
                <td>
                    <button class="btn btn-sm delete-expense-btn-js" id="expense-${index}">Delete</button>
                </td>
            </tr>`
};

let renderExpenseTable = () => {
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = partialExpenseTableHtml();
    let expenseTable = document.getElementById('expense-table')
    expenseTable.innerHTML = listToString(state.expenses, expenseTableHtml)
    document.getElementById('add-expense-form').reset();

    watchDeleteExpenseBtn();
    renderSubmitHousehold();
}

let watchExpenseBtn = () => {
    let addBillBtn = document.getElementById('add-expense-form');
    let expenseData = document.getElementsByName('create-expense');

    addBillBtn.addEventListener('submit', (e) => {
        e.preventDefault();

        state.addExpenseToState(Array.from(expenseData).map(item => item.value));

        renderExpenseTable();
    })
};

let watchDeleteExpenseBtn = () => {
    let deleteBtn = document.getElementsByClassName('delete-expense-btn-js');
    let trimIdString = 8;
    addListenerByClassName(deleteBtn, trimIdString, state.removeExpense, renderExpenseTable);
}

// ****************************************
// rendering for household submission
let submitHtml = () => {
    return `<button class="btn" id="submit-household-btn">
                Submit Houshold
            </button>`
}

let watchSubmitHousehold = () => {
    let submitHouseBtn = document.getElementById('submit-household-btn');
    submitHouseBtn.addEventListener('click', (e) => {
        let householdName = document.getElementById('household-name');
        state.name = householdName.value;

        HouseHold.name = state.name;
        HouseHold.roommates = state.roommates;
        HouseHold.expenses = state.expenses;

        console.log(HouseHold);
    })
}

let renderSubmitHousehold = () => {
    let submitHouseContainer = document.getElementById('submit-household')
    submitHouseContainer.innerHTML = '';
    if (state.readyForSubmit()) {
        submitHouseContainer.innerHTML = submitHtml();
        watchSubmitHousehold();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    watchRoommateBtn();
    watchExpenseBtn();
});