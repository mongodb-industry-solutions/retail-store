export const shippingMethods = {
    bopis: {
        id: 'bopis',
        color: 'yellow',
        iconPath:'/rsc/icons/store-solid.svg',
        label: 'Buy Online, Pick up in Store',
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
        color: 'blue',
        iconPath:'/rsc/icons/house-solid.svg',
        label: 'Buy Online, Get Delivery at Home',
        steps: [
            {
                id: 'inProcess',
                label: 'In Process'
            },
            {
                id: 'ready',
                label: 'Ready for delivery'
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
