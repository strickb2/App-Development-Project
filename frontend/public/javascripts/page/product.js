// Import Functions to load the index page
import { displayProduct } from "../container/containerHelper.js"

// Start Product Page
function init() {
    // Get URL Param
    const queryString = window.location.search 
    const urlParams = new URLSearchParams(queryString); // Variable initalized to add query parameter to URL
    const productId = urlParams.get('id'); // Product ID added to query parameter
    
    displayProduct(productId);
};

init();