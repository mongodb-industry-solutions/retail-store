import { shippingMethods } from "./constants";
import store from "@/redux/store";

export async function getProductsWithSearch(query = '', filters = {}) {
  console.log('getProductsWithSearch')
  const response = await fetch(`/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({query, facets: filters}),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error(`Error fetching products: ${response.status}`);
  }
  const data = await response.json();
  console.log('data: ', data)
  return data.products;
}

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

export async function updateCartProduct(userId, productId, isInCart) {
  const product = store.getState().Products.products[productId];
  console.log("AQUI", productId, store.getState().Products, product)
  // si el User.cart._id === null -> create cart with this product
  // const cartId = store.getState().User.cart._id;
  // si no, const addtoCart = true o false
  const response = await fetch("/api/fillCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, productsToAdd: [product], numProducts: 0}),
  });
  if (!response.ok) {
    throw new Error(`Error fetching cart: ${response.status}`);
  }

  const data = await response.json();
  console.log('hola', data)
  return data.cart;
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

export async function deleteOrder(orderId) {
  const response = await fetch("/api/deleteOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({orderId}),
  });
  if (!response.ok) {
    throw new Error(`Error deleting order: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
}


export async function fetchAssistantResponse(userId, userText, messages, ordersMinimizedSchema) {
  const response = await fetch("/api/getAssistantResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({userId, userText, messages, ordersMinimizedSchema}),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error(`Error fetching assistant response: ${response.status}`);
  }
  const data = await response.json();
  return {message: data.message, resJson: data.resJson};
}