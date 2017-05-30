const households = [
    {
        _id: "steve-christina-house",
        name: 'steve christina house',
        bills: [
            {
                name: 'electric',
                amount: 100.33,
                dueDate: '11-15-17',
                users: [
                    {
                        roommates_id: 'steve-2',
                        amountPaid: 100.33
                    },
                    {
                        roommates_id: 'christina',
                        amountPaid: 0
                    }
                ]
            },
            {
                name: 'mortgage',
                amount: 886.78,
                users: [
                    {
                        roommates_id: 'steve-2',
                        amountPaid: 450
                    },
                    {
                        roommates_id: 'christina',
                        amountPaid: 436.78
                    }
                ]
            }
        ],
        roommates: [
            {
                _id: 'steve-2',
                name: 'steve 2'
            },
            {
                _id: 'christina',
                name: 'christina'
            }
        ]
    }
]

module.exports = households; 