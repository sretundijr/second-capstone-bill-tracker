

const dividedExpensesHtml = (list, name) => {
    const htmlListItems = list.map((item) => {
        return createListItemHtml(item.name, item.roommateAmountDue)
    })

    return `<div class="col-md-4">
            <h6>${name}</h6>
             <ol class="list-group">
                ${htmlListItems.join('')}
            </ol>
            </div>`
}

const createListItemHtml = (name, amount) => {
    return `<li class="list-group-item">${name}: ${amount}</li>`
}

module.exports = dividedExpensesHtml;