let roommateHtml = (roommate, index) => {
    return `<li>${roommate} 
                <button class="btn btn-sm delete-btn-js" id="roommate-${index}">Delete</button>
            </li>`
};

let roommateListToString = (roommates) => {
    let list = roommates.map((item, index) => {
        return roommateHtml(item, index);
    })
    return list.join('');
};

let renderRoommateList = () => {
    let roommateContainer = document.getElementById('add-roommate');
    roommateContainer.innerHTML = roommateListToString(state.roommates);
    document.getElementById('add-roommate-form').reset();

    watchDeleteRoommate();
}

let expenseTableHtml = (expense) => {
    return `<div class="col-md-6">
                <table class="table table-condensed">
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                    </tr>
                    <tr>
                        <td>${expense.name}</td>
                        <td>${expense.amount}</td>
                        <td>${expense.dueDate}</td>
                    </tr>
                </table>
            </div>`
};

let state = {
    roommates: [],
    expenses: []
};

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        let value = document.getElementsByName('create-roommate')[0].value;
        if (value !== '') {
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

let watchBillBtn = () => {
    let addBillBtn = document.getElementById('bill-btn');

    addBillBtn.addEventListener('click', (e) => {
        let tableContainer = document.getElementById('table-container');
        // tableContainer.innerHTML = expenseTable();

        let expenseData = document.getElementsByName('create-expense');

        let expense = {
            name: expenseData[0].value,
            amount: expenseData[1].value,
            dueDate: expenseData[2].value
        };

        state.expenses.push(expense)

        // tableContainer.innerHTML = listToString(state.expenses.expense, expenseTableHtml)

        console.log(state.expenses)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    watchRoommateBtn();
    watchBillBtn();
})