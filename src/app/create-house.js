let state = {
    roommates: [],
    expenses: []
};

let roommateHtml = (roommate, index) => {
    console.log(roommate)
    return `<li>${roommate.name} 
                <button class="btn btn-sm delete-btn-js" id="roommate-${index}">Delete</button>
            </li>`
};

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
}

let expenseTableHtml = (expense) => {
    return `<tr>
                <td>${expense.name}</td>
                <td>${expense.amount}</td>
                <td>${expense.dueDate}</td>
            </tr>`
};

// used in both expense and roommate render
let listToString = (list, callback) => {
    let newList = list.map((item, index) => {
        return callback(item, index);
    })
    return newList.join('');
};

let renderRoommateList = () => {
    let roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = listToString(state.roommates, roommateHtml);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
}

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        let value = { name: document.getElementsByName('create-roommate')[0].value };
        if (value.name !== '') {
            state.roommates.push(value)
        }

        renderRoommateList();
    })
}

let watchDeleteRoommate = () => {
    let deleteBtn = document.getElementsByClassName('delete-btn-js');

    Array.from(deleteBtn).forEach((item) => {
        item.addEventListener('click', (e) => {
            let index = e.target.id.substring(9);
            state.roommates.splice(index, 1);
            renderRoommateList();
        })
    })
}

let watchExpenseBtn = () => {
    let addBillBtn = document.getElementById('add-expense-form');
    let tableContainer = document.getElementById('table-container');
    let expenseData = document.getElementsByName('create-expense');

    addBillBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        tableContainer.innerHTML = partialExpenseTableHtml();
        let expenseTable = document.getElementById('expense-table')
        let expense = {
            name: expenseData[0].value,
            amount: expenseData[1].value,
            dueDate: expenseData[2].value
        };

        state.expenses.push(expense)
        expenseTable.innerHTML = listToString(state.expenses, expenseTableHtml)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    watchRoommateBtn();
    watchExpenseBtn();
})