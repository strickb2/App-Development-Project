import { getCart } from "../data/queryFetch.js"
import { removeCartItem } from "../data/queryFetch.js";

// Page Elements
const containerCartProducts = document.getElementById("ContainerCartList");
const containerCartTotal = document.getElementById("ContainerCartTotal");
const containerCartOrderButton = document.getElementById("ContainerOrderButton");

export function displayCart() {
    let oPromise = getCart();
    oPromise.then(oCartItems => {
        // If there is items in the cart
        if (oCartItems) {
            // Create Table Head
            let elTable = document.createElement('table');
            elTable.className="table table-striped table-hover table-light";
            elTable.innerHTML = "<thead class='table-dark'> \
                <tr> \
                    <th scope='col-1'>Product Image</th> \
                    <th scope='col'>Product Name</th> \
                    <th scope='col'>Quantity</th> \
                    <th scope='col'>Delete</th> \
                    <th scope='col'>Price</th> \
                </tr> \
            </thead>"
            containerCartProducts.appendChild(elTable);
            
            // - Create Table Body
            let elTableBody = document.createElement('tbody')

            // Loop through cart items
            let cartTotal = 0;
            for(let i=0; i < oCartItems.length; i++) {
                let oCartItem = oCartItems[i];
                if (oCartItem.quantity > 0) {
                    // Append current product cost to cart total
                    cartTotal += oCartItem.item_price;

                    // -- Cart Item Card Container
                    let containerCartItem = document.createElement("tr");

                    // --- Col Cart Item Image
                    let colCartItemImage = document.createElement('td');
                    colCartItemImage.innerHTML = "<img class='img-thumbnail' style='height:180px' src=" + oCartItem.product_image + ">"
                    containerCartItem.appendChild(colCartItemImage);
                    
                    // --- Col Cart Item Name
                    let colCartItemName = document.createElement("td");
                    colCartItemName.innerHTML = oCartItem.product_name;
                    containerCartItem.appendChild(colCartItemName);

                    // --- Col Cart Item Quantity
                    let colCartItemQuantity = document.createElement("td");
                    colCartItemQuantity.innerHTML = oCartItem.quantity;
                    containerCartItem.appendChild(colCartItemQuantity);

                    // --- Col Cart Item Remove Button
                    let colButtonRemove = document.createElement("td")
                    
                    let elButtonRemove = document.createElement("button");
                    elButtonRemove.className = "btn btn-danger btn-large text-center";
                    elButtonRemove.type = "submit";
                    elButtonRemove.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'> \
                     <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/> \
                     <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/> \
                    </svg>";
                    elButtonRemove.onclick = function() {
                        removeCartItem(oCartItem.product_id);
                    };
                    colButtonRemove.appendChild(elButtonRemove);

                    containerCartItem.appendChild(colButtonRemove);
                    
                    // --- Col Cart Item Price
                    let colCartItemPrice = document.createElement("td");
                    colCartItemPrice.innerHTML = "€" + oCartItem.item_price;
                    containerCartItem.appendChild(colCartItemPrice);

                    elTableBody.appendChild(containerCartItem);
                }
            }
            
            // Add Table Body to table
            elTable.appendChild(elTableBody);

            // If there is no items in the basket with quantity > 0
            if (cartTotal === 0) {
                // Empty Cart Message
                let elTableFooter = document.createElement("tfoot")
                elTableFooter.className="text-danger thead-danger";
                elTableFooter.innerHTML = "<tr> \
                        <th colspan='5' class='text-center'>'Your Cart is Empty!'</th> \
                    </tr>"
                elTable.appendChild(elTableFooter);

                // Start shopping button redirects to homepage
                const elButtonOrder = document.createElement("a");
                elButtonOrder.className = "btn btn-success btn-large";
                elButtonOrder.type = "submit";
                elButtonOrder.href ="/"
                elButtonOrder.innerHTML = "Start Shopping!";
                containerCartOrderButton.appendChild(elButtonOrder);
            } else {
                // Cart Total
                let elTableFooter = document.createElement("tfoot")
                elTableFooter.className="text-dark thead-light";
                elTableFooter.innerHTML = "<tr> \
                        <td colspan='4'></th> \
                        <th scope='col'>" + "Total: €" + cartTotal + "</th> \
                    </tr>"
                elTable.appendChild(elTableFooter);

                // Order button redirects to order page
                const elButtonOrder = document.createElement("a");
                elButtonOrder.className = "btn btn-success btn-large";
                elButtonOrder.type = "submit";
                elButtonOrder.href ="/order"
                elButtonOrder.innerHTML = "Place Order <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-arrow-right' viewBox='0 0 16 16'> \
                    <path fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/> \
                </svg>";
                containerCartOrderButton.appendChild(elButtonOrder);
            };
        }
            
        });
};