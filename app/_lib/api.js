export async function getProductsWithSearch(query, filters = {}) {
    const response = await fetch(`/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query, filters}),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cart: ${response.status}`);
    }
    const data = await response.json();
    console.log('data: ', data)
    return data.products;
  }