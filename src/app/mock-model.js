const households = [
    {
        _id: "steve-christina-house",
        name: 'steve christina house',
        expenses: [
            {
                name: 'electric',
                amount: '100.33',
                dueDate: '2017-11-15',
                lastPaidOn: '2017-11-12',
                users: [
                    // {
                    //     roommates_id: 'steve-2',
                    //     amountPaid: 100.33
                    // },
                    // {
                    //     roommates_id: 'christina',
                    //     amountPaid: 0
                    // }
                ]
            },
            {
                name: 'mortgage',
                amount: '886.78',
                dueDate: '2017-11-15',
                lastPaidOn: '2017-11-15',
                users: [
                    // {
                    //     roommates_id: 'steve-2',
                    //     amountPaid: 450
                    // },
                    // {
                    //     roommates_id: 'christina',
                    //     amountPaid: 436.78
                    // }
                ]
            },
            {
                name: 'Internet',
                amount: '86.00',
                dueDate: '2017-11-11',
                lastPaidOn: '2017-11-11',
                users: [
                    // {
                    //     roommates_id: 'steve-2',
                    //     amountPaid: 450
                    // },
                    // {
                    //     roommates_id: 'christina',
                    //     amountPaid: 436.78
                    // }
                ]
            },
            {
                name: 'Ferrari payment',
                amount: '1331.56',
                dueDate: '2017-11-11',
                lastPaidOn: '2017-11-11',
                users: [
                    // {
                    //     roommates_id: 'steve-2',
                    //     amountPaid: 450
                    // },
                    // {
                    //     roommates_id: 'christina',
                    //     amountPaid: 436.78
                    // }
                ]
            },
            {
                name: 'yacht payment',
                amount: '8872.00',
                dueDate: '2017-11-11',
                lastPaidOn: '2017-11-11',
                users: [
                    // {
                    //     roommates_id: 'steve-2',
                    //     amountPaid: 450
                    // },
                    // {
                    //     roommates_id: 'christina',
                    //     amountPaid: 436.78
                    // }
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