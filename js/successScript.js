// Script to handle functionality for success page
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get 
window.onload = () => {
    // Get the current URL parameters and store them in a variable
    const urlParameters = new URLSearchParams(window.location.search);

    // Find and store server response and card number from URL
    let serverResponse = urlParameters.get("response");
    let cardNumber = urlParameters.get("cardNumber");

    // Display error message if no response or valid card number is found
    let cardNumberRegExp = null; // REDACTED 
    if (serverResponse === null || serverResponse === "" || cardNumber === null || cardNumber === "") {
        document.getElementById("feedback-message").innerHTML = "Error! Server response or card number not recieved correctly."
    }
    else {
        // Display server response and last four digits of card number to the user 
        document.getElementById("feedback-message").innerHTML = serverResponse + ". Your credit card number ends in **** **** **** " + cardNumber.substring(12) + "."; 
    }
}