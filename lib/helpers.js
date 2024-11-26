import { setMinimizedOrderSchema } from "@/redux/slices/ChatbotSlice";
import { ORDERS_LISTED_IN_CHATBOT } from "./constants"
import store from "@/redux/store";
import { addUsersNewOrder, updateUsersOrder } from "@/redux/slices/UserSlice";

export const getMinimizedSchemaForDataworkz = async (orders) => {
    let result = []
    for (let index = 0; index < orders.length; index++) {
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
    let ordersListed = Math.min(ORDERS_LISTED_IN_CHATBOT, minimizedOrderSchema.length)
    let txt =  `Hi there! I am a GenAI Chatbot design to assist you! Here are your latest orders: `
    let html = `<div>
        Hi there! I am a GenAI Chatbot design to assist you! <br/> 
        Here are your latests orders:
         <ol>`
    for (let index = 0; index < ordersListed; index++) {
        const order = minimizedOrderSchema[index]
        txt += ` ${index + 1}. Order Id ${order.id} with status ${order.status}. `
        html += `<li>Order Id ${order.id} with status as '${order.status}'.</li>` // and ${order.products?.length} ${order.products?.length > 1 ? 'items' : 'item'}
    }
    txt += 'Which order would you like to track?'
    html += `</ol>
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

export const handleChangeInOrders = async (orderId, order) => {
    // update orders list fron UserSlice redux
    store.dispatch(updateUsersOrder({ orderId, order }))
    // update minimizedOrderSchema list from ChatbotSlice redux
    const orders = store.getState().User.orders.list;
    let result = await getMinimizedSchemaForDataworkz(orders);
    if(result)
        store.dispatch(setMinimizedOrderSchema(result))
}

export const handleCreateNewOrder = async (order) => {
    // update orders list fron UserSlice redux
    store.dispatch(addUsersNewOrder({ order }))
    // update minimizedOrderSchema list from ChatbotSlice redux
    let result = await getMinimizedSchemaForDataworkz(store.getState().User.orders.list);
    if(result)
        store.dispatch(setMinimizedOrderSchema(result))
}