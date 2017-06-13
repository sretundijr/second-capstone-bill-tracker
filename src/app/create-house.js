let roommateHtml = (roommate, index) => {
    return `<li>${roommate} 
                <button class="btn btn-sm delete-btn-js" id="${index}">Delete</button>
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

let billHtml = () => {
    return `<div class="col-md-4">
                    <div class="form-container">
                        <form action="">
                            <div class="form-group">
                                <label class="control-label" for="bill">Name</label>
                                <input class="form-control" type="text" name="create-house" value="">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="bill">Amount</label>
                                <input class="form-control" type="text" name="create-house" value="">
                            </div>
                            <div class="form-group">
                                <label class="control-label" for="bill">Due Date</label>
                                <input class="form-control" type="text" name="create-house" value="">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <button id="bill-btn" class="btn" type="button">Add a Bill</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>`
};

let state = {
    roommates: [],
    bills: []
};

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-form');

    addRoommateBtn.addEventListener('submit', (e) => {
        e.preventDefault();
        state.roommates.push(document.getElementsByName('create-roommate')[0].value)

        renderRoommateList();
    })
}

let watchDeleteRoommate = () => {
    let deleteBtn = document.getElementsByClassName('delete-btn-js');

    Array.from(deleteBtn).forEach((item) => {
        item.addEventListener('click', (e) => {
            let index = e.target.id;
            state.roommates.splice(index, 1);
            renderRoommateList(state.roommates);
        })
    })
}

let watchBillBtn = () => {
    let addBillBtn = document.getElementById('bill-btn');

    addBillBtn.addEventListener('click', (e) => {
        console.log("bill button works too")
    })
}

document.addEventListener('DOMContentLoaded', () => {
    watchRoommateBtn();
    watchBillBtn();
})