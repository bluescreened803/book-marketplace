// Script to handle functionality for responsive navbar
// Reference: https://www.w3schools.com/howto/howto_js_responsive_navbar_dropdown.asp
const showDropdownMenu = () => {
    // Use an if statement to make the dropdown menu toggle
    if (document.getElementById("dropdown-container").style.display === 'none') {
        document.getElementById("dropdown-container").style.display = 'block';
    }
    // Assume dropdown menu is initially not onscreen.
    else if (document.getElementById("dropdown-container").style.display == "") {
        document.getElementById("dropdown-container").style.display = 'block';
    } 
    else {
        document.getElementById("dropdown-container").style.display = 'none';
    }
}

document.getElementById("drop-button-mobile").addEventListener("click" , showDropdownMenu);

// When the window width exceeds 500 pixels, remove the dropdown menu if it is still onscreen
const removeDropdownMenu = () => {
    if ( window.innerWidth > 550 ) {
       if (document.getElementById("dropdown-container").style.display === 'block') {
            document.getElementById("dropdown-container").style.display = 'none';
       }
    }
}

// Assign my removal function to the resize event
window.onresize = removeDropdownMenu;

// Home button functionality
const navigateToHome = () => {
    location.href = "index.html";
}

let homeLinks = document.getElementsByClassName("home-link");
for (i=0; i < homeLinks.length; i++) {
    homeLinks[i].addEventListener("click", navigateToHome);
}