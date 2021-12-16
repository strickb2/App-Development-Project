import { getMyOrders } from "/javascripts/data/queryFetch.js";
            
const tableBodyMyOrders = document.getElementById("MyOrdersTableBody");

export function displayMyOrders() {
    let oPromise = getMyOrders();
    oPromise.then(oOrders => {
        if (oOrders.length > 0) {
            for(const i in oOrders){
                let oOrder = oOrders[i];
                let date = oOrder.date_ordered.split("T")[0].split("-").reverse().join("-");
                let time = oOrder.date_ordered.split("T")[1].split(":")[0] + ":" + oOrder.date_ordered.split("T")[1].split(":")[1]
                // Order Row
                let containerOrderRow = document.createElement("tr");
                containerOrderRow.innerHTML = "\
                <td>" + oOrder.id + "</td>\
                <td>" + date + "</td>\
                <td>" + time + "</td>\
                <td>" + "€" + oOrder.total_price + "</td>"
                
                // Add Row to Table
                tableBodyMyOrders.appendChild(containerOrderRow);
            };
        } else {
            // Displays if user has not placed any orders
            tableBodyMyOrders.className = "text-danger thead-danger";
            tableBodyMyOrders.innerHTML = "<tr> <td colspan='4' class='text-danger text-center'> You haven't placed any orders yet! </td> </tr>"
        }
    });
};