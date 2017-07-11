let CreateHouseState = require('./manage-state')
let HouseHold = require('./mock-model')
let { saveHouseHold } = require('./api')

let state = new CreateHouseState()

// roommate rendered and saved to state
let roommateHtml = (roommate, index) => {
    return `<li class="rendered-list">${roommate.name} 
                <button class="btn btn-sm btn-primary delete-btn-js rendered-roommate-btn" id="roommate-${index}">Delete</button>
            </li>`
};

let renderRoommateList = () => {
    let roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = listToString(state.getRoommates(), roommateHtml);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
};

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        let value = document.getElementsByName('create-roommate')[0].value;

        state.addRoommate(value);

        render();
    })
};

let watchDeleteRoommate = () => {
    let deleteBtn = document.getElementsByClassName('delete-btn-js');
    let trimIdString = 9;

    Array.from(deleteBtn).forEach((item) => {
        item.addEventListener('click', (e) => {
            let index = e.target.id.substring(trimIdString);
            state.removeRoommate(index);
            render();
        })
    })
    // addListenerByClassName(deleteBtn, trimIdString, state.removeRoommate, render);
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
            // list(index)
            // state.removeRoommate(index);
            callback();
        })
    })
}

// *******************************************
// expenses rendered and saved to state
let partialExpenseTableHtml = () => {
    return `<div>
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
                    <button class="btn btn-sm btn-primary delete-expense-btn-js" id="expense-${index}">Delete</button>
                </td>
            </tr>`
};

let renderExpenseTable = () => {
    let tableContainer = document.getElementById('table-container');

    if (state.getExpenses().length >= 1) {
        tableContainer.innerHTML = partialExpenseTableHtml();
        let expenseTable = document.getElementById('expense-table')
        expenseTable.innerHTML = listToString(state.getExpenses(), expenseTableHtml)
        document.getElementById('add-expense-form').reset();

        watchDeleteExpenseBtn();
    } else {
        tableContainer.innerHTML = '';
    }

}

// does not work in safari with html date picker
let watchExpenseBtn = () => {
    let addBillBtn = document.getElementById('add-expense-form');

    addBillBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        let expenseObject = {}
        let expenseData = new FormData(e.currentTarget);

        for ([key, value] of expenseData) {
            expenseObject[key] = value;
        }
        state.addExpenseToState(expenseObject);

        render();
    })
};

let watchDeleteExpenseBtn = () => {
    let deleteBtn = document.getElementsByClassName('delete-expense-btn-js');
    let trimIdString = 8;
    Array.from(deleteBtn).forEach((item) => {
        item.addEventListener('click', (e) => {
            let index = e.target.id.substring(trimIdString);
            state.removeExpense(index);
            render();
        })
    })
    // addListenerByClassName(deleteBtn, trimIdString, state.removeExpense, render);
}

// ****************************************
// rendering for household submission
let submitHtml = () => {
    return `<button class="btn btn-primary" id="submit-household-btn">
                Submit Houshold
            </button>`
}

let watchSubmitHousehold = () => {
    let submitHouseBtn = document.getElementById('submit-household-btn');
    submitHouseBtn.addEventListener('click', (e) => {
        let householdName = document.getElementById('household-name');
        state.setHouseName(householdName.value);

        saveHouseHold(state.getHouseHold());

        location.href = '/house-stats';
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

let render = () => {

    renderRoommateList();

    renderExpenseTable();

    renderSubmitHousehold();
}

document.addEventListener('DOMContentLoaded', () => {
    watchRoommateBtn();
    watchExpenseBtn();
});