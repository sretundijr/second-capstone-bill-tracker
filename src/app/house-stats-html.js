let htmlString = (item, index) => {
    //replace with object and or simplify
    let inputReadOnly = item.editable ? ['', '', 'Save'] : ['readonly', '', 'Edit'];
    return `<div class="row">
                    <form action="#" class="form-inline" id="house-expense">

                        <div class="col-sm-2">
                        <label class="col-form-label" for="bill">Name</label>
                            <input class="form-control input-style" name="name" type="text" ${inputReadOnly[0]} value="${item.name}">
                        </div>
                        <div class="col-sm-2">
                        <label for="bill"> Date Due</label>
                            <input class="form-control input-style" name="dueDate" type="date" ${inputReadOnly[0]} value="${item.dueDate}">
                        </div>
                       
                        <div class="col-sm-2">
                         <label for="bill">Amount</label>
                            <input class="form-control input-style" name="amount" type="text" ${inputReadOnly[0]} value="${item.amount}">
                        </div>
                        
                        <div class="col-sm-2 hide-this">
                        <label for="bill">Who paid it:</label>
                            <input class="form-control input-style" name="bill" type="text" value="${'coming soon'}">
                        </div>
                        
                        <div  class="col-sm-2 hide-this">
                        <label for="bill">Paid On:</label>
                            <input class="form-control" name="bill" type="text" ${inputReadOnly[0]} value="${'coming soon'}">
                        </div>

                        <div class="col-sm-2">
                            <input value="${inputReadOnly[2]}" name="bill" id="edit-bill-${index}" ${inputReadOnly[1]} class="form-control edit-btn-style watch-js btn btn-primary btn-sm">
                           
                            </input>
                        </div>
                    </form>
                </div>`
}

module.exports = htmlString;