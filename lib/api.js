import { shippingMethods } from "./constants";

export async function fetchUsers() {
  const response = await fetch("/api/getUsers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.status}`);
  }

  const data = await response.json();
  return data.users;
}

export async function fetchStoreLocations() {
  const response = await fetch("/api/getStoreLocations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
  if (!response.ok) {
    throw new Error(`Error fetching store locations: ${response.status}`);
  }

  const data = await response.json();
  return data.storeLocations;
}

export async function fillCartRandomly(userId, numProducts = null) {
  if(numProducts === null){
    numProducts = Math.floor(Math.random() * 5) + 1; // get a random int number between 1 and 5
  }
  const response = await fetch("/api/fillCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, numProducts}),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }
  const data = await response.json();
  return data.cart;
}

export async function fetchCart(userId) {
  const response = await fetch("/api/getCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }

  const data = await response.json();
  return data.cart;
}

export async function clearCart(userId) {
  const response = await fetch("/api/clearCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }

  const data = await response.json();
  return data.products;
}

export async function fetchOrders(userId) {
  const response = await fetch("/api/getOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }
  const data = await response.json();
  return data.orders;
}

export async function fetchOrderDetails(orderId) {
  const response = await fetch("/api/getOrderDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderId),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }
  const data = await response.json();
  return data.order;
}

export async function createNewOrder(userId, userAddress, products = [], shippingMethod, storeAddress ){
  const order = {
    userId,
    products,
    type: shippingMethod.label,
    shipping_address: shippingMethod.id === shippingMethods.bopis.id
      ? `${storeAddress.street_and_number}, ${storeAddress.city} ${storeAddress.cp}, ${storeAddress.country}`
      : shippingMethod.id === shippingMethods.home.id
      ? `${userAddress.street_and_number}, ${userAddress.city} ${userAddress.cp}, ${userAddress.country}`
      : 'Unknown address'
  }
  const response = await fetch("/api/createOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }
  const data = await response.json();
  return data.order;
}

export async function addOrderStatusHistory(orderId, statusObj) {
  console.log(orderId, statusObj)
  const response = await fetch("/api/updateOrderStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({orderId, statusObj}),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }
  const data = await response.json();
  return data.order;
}

export async function fetchAssistantResponse(userId, userText, messages, ordersMinimizedSchema) {
  console.log
  const response = await fetch("/api/getAssistantResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, userText, messages, ordersMinimizedSchema}),
  });
  if (!response.ok) {
    throw new Error(`Error fetching assistant response: ${response.status}`);
  }
  const data = await response.json();
  return {message: data.message, resJson: data.resJson};
}