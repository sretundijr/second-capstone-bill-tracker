let htmlString = (item, index) => {
    //replace with object and or simplify
    let inputReadOnly = item.editable ? ['', '', 'Save'] : ['readonly', '', 'Edit'];
    return `<div class="row">
                <div class="col-md-10 col-md-offset-1">
                    <div class="row main-container-style">
                    <form action="#" class="form-inline" id="house-expense">

                        <div class="col-md-2">
                        <label for="bill">Name</label>
                            <input class="form-control" name="name" type="text" ${inputReadOnly[0]} value="${item.name}">
                        </div>
                        <div class="col-md-2">
                        <label for="bill"> Date Due</label>
                            <input class="form-control" name="dueDate" type="date" ${inputReadOnly[0]} value="${item.dueDate}">
                        </div>
                       
                        <div class="col-md-2">
                         <label for="bill">Amount</label>
                            <input class="form-control" name="amount" type="text" ${inputReadOnly[0]} value="${item.amount}">
                        </div>
                        
                        <div class="col-md-2">
                        <label for="bill">Who paid it:</label>
                            <input class="form-control" name="bill" type="text" value="${'coming soon'}">
                        </div>
                        
                        <div  class="col-md-2">
                        <label for="bill">Paid On:</label>
                            <input class="form-control" name="bill" type="text" ${inputReadOnly[0]} value="${'coming soon'}">
                        </div>

                        <div class="col-md-2">
                            <div></div>
                            <input value="${inputReadOnly[2]}" name="bill" id="edit-bill-${index}" ${inputReadOnly[1]} class="edit-btn-style watch-js btn btn-primary btn-sm">
                           
                            </input>
                        </div>
                    </form>
                    </div>
                    <hr class='hr-style'>
                </div>                
            </div>`
}

module.exports = htmlString;