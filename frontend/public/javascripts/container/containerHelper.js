// File for functions to help miscellaneous tasks to do with container population
import { getArtists, getGenres, getLabels, getProduct } from "../data/queryFetch.js";
import { displayFilters } from "./containerFilters.js"
import { createProductContainer } from "./containerProduct.js";
import { createProductsContainer } from "./containerProducts.js";

// ------ Page Elements ------
export const containerArtistFilter = document.getElementById("FilterArtist");
export const containerGenreFilter = document.getElementById("FilterGenre");
export const containerLabelFilter = document.getElementById("FilterLabel");

// ------ UnPopulating Container ------
export function clearContainer(container) {
    container.innerHTML = "";
};

// ------ Displays given products on home page ------
export function displayProducts(promiseProducts) {
    promiseProducts.then(oProducts => {
      createProductsContainer(oProducts);
    });
};

// ------ Displays all filters on home page ------
export function displayAllFilters() {
    displayArtistsFilters();
    displayLabelsFilters();
    displayGenresFilters();
}

function displayArtistsFilters() {
let promiseArtists = getArtists();
displayFilters(promiseArtists, containerArtistFilter);
};

function displayGenresFilters(oGenres) {
let promiseGenres = getGenres();
displayFilters(promiseGenres, containerGenreFilter);
};

function displayLabelsFilters(oLabels) {
let promiseLabels = getLabels();
displayFilters(promiseLabels, containerLabelFilter);
};

// ------ Displays selected product on product page ------
export function displayProduct(product_id) {
    let promiseProduct = getProduct(product_id);
    promiseProduct.then(oProduct => oProduct ? createProductContainer(oProduct[0]): null);
}