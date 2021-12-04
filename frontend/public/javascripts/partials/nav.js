import { getCurrentUser } from "../data/queryFetch.js"

export function navLoad() {
    // Get nav list
    const navList = document.getElementById("navList");
    if (localStorage.getItem('access')) {
        // If signed in, put user name beside account icon on navbar
        let userPromise = getCurrentUser();
        userPromise.then(user => {
            // ------ User Name ------
            let elUserNameItem = document.createElement("li");
            elUserNameItem.className = "nav-item";

            let elUserName = document.createElement("a");
            elUserName.className = "nav-link";
            elUserName.innerHTML = "Welcome, " + (user.name).split(" ")[0];

            elUserNameItem.appendChild(elUserName);
            navList.appendChild(elUserNameItem);
            
            // ------ Account Icon ------
            let elAccountIcon = document.createElement("li");
            elAccountIcon.className = "nav-item";
            elAccountIcon.innerHTML = "<a class='nav-link'> \
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/> \
                <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> \
                </svg> \
                </a>"
            elAccountIcon.onclick = function() {
                alert("Logged Out");
                localStorage.setItem("access", "");
                localStorage.setItem("refresh", "");
                window.location.href = "/";
                // Add Usability Button to Log Out here
            };
            navList.appendChild(elAccountIcon);

            // ------ Cart Icon ------
            let elCartIcon = document.createElement("li");
            elCartIcon.className = "nav-item"
            elCartIcon.innerHTML = "<a class='nav-link' href='/cart'> \
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-cart2' viewBox='0 0 16 16'> \
                <path d='M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z'/> \
                </svg> \
                </a>"
            navList.appendChild(elCartIcon);
        });
    } else {
        // Otherwise have link to login and signup beside icon
        
        // ------ Nav Login ------
        let elLoginListItem = document.createElement("li");
        elLoginListItem.className = "nav-item";

        let elLoginLink = document.createElement("a");
        elLoginLink.className = "nav-link";
        elLoginLink.href = "/login";
        elLoginLink.innerHTML = "Login";
        
        elLoginListItem.appendChild(elLoginLink);
        navList.appendChild(elLoginListItem);
        
        // ------ Nav Signup ------
        let elSignupListItem = document.createElement("li");
        elSignupListItem.className = "nav-item";

        let elSignupLink = document.createElement("a");
        elSignupLink.className = "nav-link";
        elSignupLink.href = "/signup";
        elSignupLink.innerHTML = "Sign Up";
        
        elSignupListItem.appendChild(elSignupLink);
        navList.appendChild(elSignupListItem);
    };
};

navLoad();