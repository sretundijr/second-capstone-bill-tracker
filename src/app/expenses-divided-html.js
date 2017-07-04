

const dividedExpensesHtml = (list) => {
    const htmlListItems = list.map((item) => {
        return createListItemHtml(item.name, item.roommateAmountDue)
    })

    return `<div class="col-md-4">
            <h6>a roommate</h6>
             <ol>
                ${htmlListItems.join('')}
            </ol>
            </div>`
}

const createListItemHtml = (name, amount) => {
    return `<li>${name}: ${amount}</li>`
}

module.exports = dividedExpensesHtml;