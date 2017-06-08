let roommateHtml = `<div class="col-md-4">
                    <div class="form-container">
                        <form action="">
                            <div class="form-group">
                                <label class="control-label" for="household-roommate">Roommate</label>
                                <input class="form-control" type="text" name="create-house" value="">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <button id="add-roommate-btn" class="btn" type="button">Add a Roommate</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>`;

let billHtml = `<div class="col-md-4">
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

let watchRoommateBtn = () => {
    let addRoommateBtn = document.getElementById('add-roommate-btn');

    addRoommateBtn.addEventListener('click', (e) => {
        console.log('hello roommmate webpack is still watching')
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