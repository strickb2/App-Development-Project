import { getCurrentUser, getCart } from "../data/queryFetch.js"

// Containers for user data
const containerOrderName = document.getElementById("ContainerName");
const containerOrderEmail = document.getElementById("ContainerEmail");
const containerOrderPhone = document.getElementById("ContainerPhone");
const containerOrderAddress = document.getElementById("ContainerAddress");

// Containers for Cart Data
const containerOrderProduct = document.getElementById("ContainerOrderCart");
const containerOrderProductTotal = document.getElementById("ContainerOrderCartTotal");

export function displayCart() {
    // User Data
    let oPromise = getCurrentUser();
    oPromise.then(oUser => {
        // User Name
        let elUserName = document.createElement("p");
        elUserName.innerHTML = oUser.name
        elUserName.className = "card-text";

        // User Address
        let elUserAddress = document.createElement("p");
        elUserAddress.innerHTML = oUser.address
        elUserAddress.className = "card-text";

        // User Email
        let elUserEmail = document.createElement("p");
        elUserEmail.innerHTML = oUser.email
        elUserEmail.className = "card-text";

        // User Phone
        let elUserPhone = document.createElement("p");
        elUserPhone.innerHTML = oUser.phone
        elUserPhone.className = "card-text";

        containerOrderName.append(elUserName);
        containerOrderEmail.append(elUserEmail);
        containerOrderAddress.append(elUserAddress);
        containerOrderPhone.append(elUserPhone);
    });

    // Product Data
    oPromise = getCart();
    oPromise.then(oProducts => {
        if (oProducts) {
            // Get product from promise.json()
            let cartTotal = 0;
            for(let i=0; i < oProducts.length; i++) {
                let oProduct = oProducts[i];
                if (oProduct.quantity > 0) {
                    // Append current product cost to cart total
                    cartTotal += oProduct.item_price;

                    // Cart Item Container
                    let containerCartItem = document.createElement("li");
                    containerCartItem.className = "list-group-item d-flex justify-content-between lh-condensed";
                    containerOrderProduct.appendChild(containerCartItem);

                    // Item Name
                    let elCartItemName = document.createElement("h6");
                    elCartItemName.innerHTML = oProduct.product_name;
                    elCartItemName.className = "my-0";

                    // Item Quantity
                    let elCartItemQuantity = document.createElement("small");
                    elCartItemQuantity.innerHTML = " x" + oProduct.quantity;
                    elCartItemQuantity.className = "text-muted";
                    elCartItemName.appendChild(elCartItemQuantity);


                    // Item Price
                    let elCartItemPrice = document.createElement("span");
                    elCartItemPrice.innerHTML = "€" + oProduct.item_price;
                    elCartItemPrice.className = "text-muted";
                    
                    containerCartItem.appendChild(elCartItemName);
                    containerCartItem.appendChild(elCartItemPrice);
                };
            };
            
            // Order Total
            let elCartTotal = document.createElement("span");
            elCartTotal.innerHTML = "Total: €" + "<strong id='totalPrice'>" + cartTotal + "</strong>";
            containerOrderProductTotal.appendChild(elCartTotal);
        };
    });
};