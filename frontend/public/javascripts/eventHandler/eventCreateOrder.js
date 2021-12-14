import { createOrderFetch, getBasket } from "../data/queryFetch.js";

export function createOrder() {
    // Get basketId
    let oPromise = getBasket();
    oPromise.then(oBasket => {
        createOrderFetch(oBasket[0].id);
    });
    
}