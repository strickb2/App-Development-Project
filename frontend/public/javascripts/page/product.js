// Import Functions to load the index page
import { displayProduct } from "../container/containerHelper.js"

// Start Product Page
function init() {
    // Get URL Param
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('id');
    
    displayProduct(productId);
};

init();