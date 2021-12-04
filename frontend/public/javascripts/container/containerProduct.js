export const containerProduct = document.getElementById("ProductContainer");
export const containerProductTitle = document.getElementById("ProductTitleContainer");
export const containerProductImage = document.getElementById("ProductImageContainer");
export const containerProductDesc = document.getElementById("ProductDescContainer");
export const containerProductPriceBuy = document.getElementById("ProductPriceBuyContainer");

// Display individual product data on product page
export function createProductContainer(oProduct) {
    // if there is a product
    if (oProduct) {
        // Column 1: Image in top left corner
        let elProductImage = document.createElement('img');
        elProductImage.className = "img-thumbnail";
        elProductImage.src = oProduct.product_image;
        containerProductImage.appendChild(elProductImage);

        // Column 2: Title Description
        const containerTitleDesc = document.createElement("div");

        // Column 2a: Product Name
        let elProductName = document.createElement("h3");
        elProductName.innerHTML = oProduct.name + "<br><br><br>";
        containerTitleDesc.appendChild(elProductName);

        // Column 2b: Product Artist
        let elProductArtist = document.createElement("h5");
        elProductArtist.innerHTML = "By " + oProduct.artist;
        containerTitleDesc.appendChild(elProductArtist);

        // Column 2c: Product Label
        let elProductLabel = document.createElement("p");
        elProductLabel.innerHTML = "Label: " + oProduct.label;
        containerTitleDesc.appendChild(elProductLabel);

        // Column 2d: Product Genre
        let elProductGenre = document.createElement("p");
        elProductGenre.innerHTML = "Genre: " + oProduct.genre;
        containerTitleDesc.appendChild(elProductGenre);

        // Column 2e: Add Product Title Description to parent
        containerProductDesc.appendChild(containerTitleDesc);

        // Column 3: Price and Buy Button

        // Column 3a: Price
        const elProductPrice = document.createElement("h1");
        elProductPrice.innerHTML = "€" + oProduct.price + "<br>";
        containerProductPriceBuy.appendChild(elProductPrice);

        // Column 3b: Buy
        const elButtonBuy = document.createElement("button");
        elButtonBuy.className = "btn btn-outline-primary btn-large text-center";
        elButtonBuy.type = "submit";
        elButtonBuy.innerHTML = "Add to Cart";
        elButtonBuy.onclick = async function () {
            let access = localStorage.getItem("access")
            if(access){
                let response = await fetch("http://127.0.0.1:8000/add/",
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + access
                        },
                        body: JSON.stringify({"product_id": oProduct.id})
                    })
                if (response.status < 400) {
                    alert("Added to your cart!")
                }
            } else (
                window.location.href = "/login"
            )
        }
        containerProductPriceBuy.appendChild(elButtonBuy);
    }
}
