import { getProductsQuery, getGenresQuery, getArtistsQuery, getLabelsQuery, getProductQuery, getCurrentUserQuery, getBasketItemsQuery, getSongsQuery, getBasketQuery } from "./queryUrl.js";

// Function to fetch query from given URL
export async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

// Retrieves Products List
export function getProducts() {
  return getData(getProductsQuery());
};

// Retrieves Artists List
export function getArtists() {
  return getData(getArtistsQuery());
};

// Retrieves Genres List
export function getGenres() {
  return getData(getGenresQuery());
};

// Retrieves Labels List
export function getLabels() {
  return getData(getLabelsQuery());
};

// Retrieves a given product
export function getProduct(product_id) {
  return getData(getProductQuery(product_id));
};

// Retrieves User's Cart
export async function getCart() {
  let access = localStorage.getItem("access");
  if(access) {
    let response = await fetch(getBasketItemsQuery(), {
      method: 'GET',

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access                                       
      },
    });
    let data = response.json();
    return data;
  } else {
    //the user is not logged in,redirect them to the login page
    window.location.href = "/login"
  };
};

export function getSongs(product_id) {
  return getData(getSongsQuery(product_id));
}

export async function getBasket() {
  let access = localStorage.getItem("access");
  if(access) {
    let response = await fetch(getBasketQuery(), {
      method: 'GET',

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access                                       
      },
    });
    let data = response.json();
    return data;
  } else {
    //the user is not logged in,redirect them to the login page
    window.location.href = "/login"
  };
}

// Retrieves User's Data
export async function getCurrentUser() {
  let sToken = localStorage.getItem('access');

  let oHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + sToken,
  };

  let response = await fetch(getCurrentUserQuery(),
    {
      method: "GET",
      headers: oHeaders,
    }
  );

  let data = await response.json();
  return data;
};

// Removes Cart Item or quantity
export async function removeCartItem(product_id) {
  let access = localStorage.getItem("access");
  if(access) {
    fetch('http://127.0.0.1:8000/remove/', {
      method: 'POST',

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access                                       
      },
      
      body: JSON.stringify({
      "product_id": product_id
      }),
  })
  .then(response => response.json())
    window.location.reload();
  } else {
    //the user is not logged in,redirect them to the login page
    window.location.href = "/login"
  };
}

export async function createOrderFetch(basket_id) {
  let access = localStorage.getItem("access");
  if(access) {
    let total_price = document.getElementById("totalPrice").innerHTML;
    let response = fetch('http://127.0.0.1:8000/checkout/', {
      method: 'POST',

      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access                                       
      },
      
      body: JSON.stringify({
      "basket_id": basket_id,
      'total_price': total_price
      }),
    });
    if (response) {
      window.location.href = "/";
      alert("Order Confirmed");
    };
  } else {
    //the user is not logged in,redirect them to the login page
    window.location.href = "/login";
  };
}