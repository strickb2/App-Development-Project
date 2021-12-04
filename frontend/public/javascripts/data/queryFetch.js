import { getProductsQuery, getGenresQuery, getArtistsQuery, getLabelsQuery, getProductQuery, getCurrentUserQuery } from "./queryUrl.js";

// Function to fetch query from given URL
export async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

// Function to fetch query from given URL with given headers(e.g. auth token)
export async function getDataWithHeaders(url, oHeaders) {
  let response = await fetch(url,
    {
      method: "GET",
      headers: oHeaders,
    }
  );
  let data = await response.json();
  return data;
};

export function getProducts() {
  return getData(getProductsQuery());
};

export function getArtists() {
  return getData(getArtistsQuery());
};

export function getGenres() {
  return getData(getGenresQuery());
};

export function getLabels() {
  return getData(getLabelsQuery());
};

export function getProduct(product_id) {
  return getData(getProductQuery(product_id));
}

export async function getCurrentUser() {
  let token = localStorage.getItem('access');

  let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }

  return getDataWithHeaders(getCurrentUserQuery(), headers);
}