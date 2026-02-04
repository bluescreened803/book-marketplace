// Script to handle functionality of pay button 
window.onload = () => {
    // When pay button clicked, navigate to pay page.
    const navigateToPay = () => {
        location.href = "pay.html"
    }
    
    // Find all pay buttons and store them in a variable
    let allPayButtons = document.getElementsByClassName("book-pay-button");

    // Iterate through every pay button and add an event listener
    for (let i=0; i < allPayButtons.length; i++) {
        allPayButtons[i].addEventListener("click", navigateToPay)
    }
}