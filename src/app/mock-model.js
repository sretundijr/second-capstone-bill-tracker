const households = [
    {
        _id: "steve-christina-house",
        name: 'steve christina house',
        expenses: [
            {
                name: 'electric',
                amount: '100.33',
                dueDate: '2017-11-15',
            },
            {
                name: 'mortgage',
                amount: '886.78',
                dueDate: '2017-11-15',
            },
            {
                name: 'Internet',
                amount: '86.00',
                dueDate: '2017-11-11',
            },
            {
                name: 'Ferrari payment',
                amount: '1331.56',
                dueDate: '2017-11-11',
            },
            {
                name: 'yacht payment',
                amount: '8872.00',
                dueDate: '2017-11-11',
            }
        ],
        roommates: [
            {
                _id: 'steve-2',
                name: 'steve'
            },
            {
                _id: 'christina',
                name: 'christina'
            }
        ]
    }
]

module.exports = households; 