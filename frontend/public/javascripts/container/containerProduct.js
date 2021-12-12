import { getSongs } from "../data/queryFetch.js";

export const containerProduct = document.getElementById("ProductContainer");
export const containerProductTitle = document.getElementById("ProductTitleContainer");
export const containerProductImage = document.getElementById("ProductImageContainer");
export const containerProductDesc = document.getElementById("ProductDescContainer");
export const containerProductPriceBuy = document.getElementById("ProductPriceBuyContainer");
export const containerSongsTable = document.getElementById('SongsTable')

// Display individual product data on product page
export function createProductContainer(oProduct) {
    // if there is a product
    if (oProduct) {
        // Display Product Info
        // - Column 1: Image in top left corner
        let elProductImage = document.createElement('img');
        elProductImage.className = "img-thumbnail";
        elProductImage.style = "height:300px";
        elProductImage.src = oProduct.product_image;
        containerProductImage.appendChild(elProductImage);

        // - Column 2: Title Description
        const containerTitleDesc = document.createElement("div");

        // -- Column 2a: Product Name
        let elProductName = document.createElement("h1");
        elProductName.className = "fw-light";
        elProductName.innerHTML = oProduct.name;
        containerTitleDesc.appendChild(elProductName);

        // -- Column 2b: Product Artist
        let elProductArtist = document.createElement("h5");
        elProductArtist.className = "lead";
        elProductArtist.innerHTML = "By " + oProduct.artist + "<br><br><br><br>";
        containerTitleDesc.appendChild(elProductArtist);

        // -- Column 2c: Product Label
        let elProductLabel = document.createElement("p");
        elProductLabel.className = "lead";
        elProductLabel.innerHTML = "Label: " + oProduct.label;
        containerTitleDesc.appendChild(elProductLabel);

        // -- Column 2d: Product Genre
        let elProductGenre = document.createElement("p");
        elProductGenre.className = "lead";
        elProductGenre.innerHTML = "Genre: " + oProduct.genre;
        containerTitleDesc.appendChild(elProductGenre);

        // -- Column 2e: Add Product Title Description to parent
        containerProductDesc.appendChild(containerTitleDesc);

        // - Column 3: Price and Buy Button

        // -- Column 3a: Price
        const elProductPrice = document.createElement("h1");
        elProductPrice.innerHTML = "€" + oProduct.price + "<br>";
        containerProductPriceBuy.appendChild(elProductPrice);

        // -- Column 3b: Buy
        const elButtonBuy = document.createElement("button");
        elButtonBuy.className = "btn btn-primary btn-large text-center";
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

        // Display Product songs list in a table
        let oPromise = getSongs(oProduct.id);
        oPromise.then(oSongs => {
            // Create Table
            let elTable = containerSongsTable;
            
            // Table Header (#, Name)
            elTable.innerHTML = "<thead class='table-dark'> \
                <tr> \
                    <th scope='col-1'>#</th> \
                    <th scope='col'>Song Name</th> \
                </tr> \
            </thead>"
            
            // Table Body (1->x, name)
            let elTableBody = document.createElement("tbody");
            // If we find songs
            if (oSongs.length > 0) {
                for (let i = 0; i < oSongs.length; i++) {
                    let oSong = oSongs[i];
                    
                    // Song Row
                    let row = document.createElement("tr");

                    // Song No.
                    let colSongNum = document.createElement("td");
                    colSongNum.innerHTML = (i+1);
                    row.appendChild(colSongNum);

                    // Song Name
                    let colSongName = document.createElement("td");
                    colSongName.innerHTML = oSong.name;
                    row.appendChild(colSongName);
                    
                    elTableBody.appendChild(row);
                }
            } else {
                elTableBody.className = "text-danger thead-danger";
                elTableBody.innerHTML = "<tr> \
                <th colspan='2' class='text-center text-danger'>'No Songs Found'</th> \
                </tr>"
            }
            elTable.appendChild(elTableBody);
        })

    }
}
