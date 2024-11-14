export const shippingMethods = {
    bopis: {
        id: 'bopis',
        label: 'Buy Online, Pick up in store',
        steps: [
            {
                id: 'inProcess',
                label: 'In Process'
            },
            {
                id: 'ready',
                label: 'Ready for pickup'
            },
            {
                id: 'sutomerInStore',
                label: 'Customer In Store'
            },
            {
                id: 'completed',
                label: 'Completed'
            }
        ]
    },
    home: {
        id: 'home',
        label: 'Buy Online, Get Delivery at Home',
        steps: [
            {
                id: 'inProcess',
                label: 'In Process'
            },
            {
                id: 'ready',
                label: 'Ready for delivered'
            },
            {
                id: 'warehouse',
                label: 'Picked up from warehouse'
            },
            {
                id: 'transit',
                label: 'In Transit'
            },
            {
                id: 'delivered',
                label: 'Delivered'
            }
        ]
    }
}

export const ROLE = {
    assistant: 'AI',
    user: 'USER'
}

export const ORDERS_LISTED_IN_CHATBOT = 5