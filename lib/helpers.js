import { ORDERS_LISTED_IN_CHATBOT } from "./constants"

export const getMinimizedSchemaForDataworkz = async (orders) => {
    let ordersListed = Math.min(ORDERS_LISTED_IN_CHATBOT, orders.length)
    let result = []
    for (let index = 0; index < ordersListed; index++) {
        const order = orders[index];
        const status = order.status_history[order.status_history.length - 1]
        result.push({
            id: order._id,
            user: order.user,
            shipping_address: order.shipping_address,
            status: status.status,
            status_date: prettifyDateFormat(status.timestamp),
            type: order.type,
            products: order.products?.map(product => ({
                id: product._id,
                name: product.name,
                description: product.description,
                code: product.code,
                brand: product.brand,
                price: `$${product.price.amount}`
            })) || []
        })
    }
    return result
}

export const calculateInitialMessage = async (minimizedOrderSchema) => {
    let txt =  `Hi there! I am a GenAI Chatbot design to assist you! Here are your orders: `
    let html = `<div>
        Hi there! I am a GenAI Chatbot design to assist you! <br/> 
        Here are your orders:
         <ul>`
    for (let index = 0; index < minimizedOrderSchema.length; index++) {
        const order = minimizedOrderSchema[index]
        txt += `Order Id: ${order.id} with status ${order.status} `
        html += `<li>Order Id: ${order.id} with status as '${order.status}'</li>`
    }
    txt += 'Which order would you like to track?'
    html += `<ul/>
        Which order would you like to track?
    </div>`

    return {txt, html}
}

export const prettifyDateFormat = (timestamp) => {
    const date = new Date(timestamp);
    // Format the date part (e.g., "Jan 1, 2000")
    const datePart = date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    // Format the time part (e.g., "12:00:00 AM")
    const timePart = date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    return `${datePart} at ${timePart}`;
}