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

  export async function getProductsWithVectorSearch(query, filters = {}) {
    console.log('getProductsWithVectorSearch')
    const response = await fetch(`/api/vectorSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query, facets: filters}),
    });
    if (!response.ok) {
      throw new Error(`Error fetching cart: ${response.status}`);
    }
    const data = await response.json();
    console.log('data: ', data)
    return data.products;
  }
  