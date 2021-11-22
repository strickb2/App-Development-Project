import { getProductsQuery, getGenresQuery, getArtistsQuery, getLabelsQuery, getProductQuery } from "./queryUrl.js";

export async function getData(url) {
  let response = await fetch(url);
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