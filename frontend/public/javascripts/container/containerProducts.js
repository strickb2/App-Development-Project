import { getProductRedirectQuery } from "../data/queryUrl.js";

// Get products container
export const containerProducts = document.getElementById("ProductsContainer");

// Display products data in products container on home page
export function createProductsContainer(oProducts) {
    // If we have products
    if (oProducts.length > 0) {
        for(let idProduct=0; idProduct<=oProducts.length - 1; idProduct++) {
            let oProduct = oProducts[idProduct];
            
            // Card for all product info
            let containerProduct = document.createElement('div');
            containerProduct.className = "card flex-row m-2 text-dark";
            
            // Column for product image
            let columnImage = document.createElement('div');
            columnImage.className = "col-3";

            let elProductImage = document.createElement('img');
            elProductImage.className = "card-img-top"; // img-thumbnail
            elProductImage.src = oProduct.product_image;

            columnImage.appendChild(elProductImage);

            // Column for product name, artist, label and genre
            let columnDesc = document.createElement('div');
            columnDesc.className = "col-7";
            
            let elProductDescTitleName = document.createElement("h2");
            elProductDescTitleName.innerHTML = oProduct.name;
            columnDesc.appendChild(elProductDescTitleName);

            let elProductDescTitleArtist = document.createElement("h4");
            elProductDescTitleArtist.innerHTML = "By " + oProduct.artist
            columnDesc.appendChild(elProductDescTitleArtist);

            let elProductDescBody = document.createElement("h5");
            elProductDescBody.innerHTML = "<br>Genre: " +oProduct.genre + "<br><br>Label: "+ oProduct.label; ;
            columnDesc.appendChild(elProductDescBody);

            // Column for product price and more info button
            let columnMoreInfo = document.createElement('div');
            columnMoreInfo.className = "col-2";

            let elProductPrice = document.createElement("h3");
            elProductPrice.innerHTML = "€" + oProduct.price +"<br><br><br>";
            columnMoreInfo.appendChild(elProductPrice);

            let elButtonMoreInfo = document.createElement("button");
            elButtonMoreInfo.className = "btn btn-outline-primary btn-large text-center";
            elButtonMoreInfo.innerHTML = "More Info";
            elButtonMoreInfo.onclick = function() {window.location.href = getProductRedirectQuery(oProduct.id)};
            columnMoreInfo.appendChild(elButtonMoreInfo);

            containerProduct.appendChild(columnImage);
            containerProduct.appendChild(columnDesc);
            containerProduct.appendChild(columnMoreInfo);

            containerProducts.appendChild(containerProduct);
        };
    } else {
        // If no products say none found
        let elProductNotFound = document.createElement("h3");

        elProductNotFound.innerHTML = "No Products Found."

        containerProducts.appendChild(elProductNotFound);
    }
};