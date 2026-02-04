// Script to handle processing of payment form
const processPaymentForm = (event) => {
    event.preventDefault();

    let validInputCount = 0;

    let cardNumber = document.getElementById("card-number").value;
    if (validateCardNumber(cardNumber, "card-number-error") === true) {
        // Increase the counter once the input has been sucessfully validated
        validInputCount = validInputCount + 1;
    }

    let expiryMonth = document.getElementById("expiry-month").value;
    let expiryYear = document.getElementById("expiry-year").value;
    if (validateExpiryDate(expiryMonth, expiryYear, "expiry-date-error") === true) {
        validInputCount = validInputCount + 1;
    }

    let cvvCode = document.getElementById("cvv-code").value;
    if (validateCvvCode(cvvCode, "cvv-code-error") === true) {
        validInputCount = validInputCount + 1;
    }

    // Only if all the inputs on the payment form are correct is a POST request sent
    if (validInputCount > 3) {
        // Do not allow the input count to be greater than 3
        throw new Error("Error! You currently cannot have more than 3 valid inputs");
    }
    else if (validInputCount === 3) {
        // Update the cursor to provide feedback to the user about the status of their request
        document.body.style.cursor = "wait";
        processSuccess("Operation successful", cardNumber);
        //sendPostRequest(cardNumber, cvvCode, expiryMonth, expiryYear);
    }
}

const validateCardNumber = (cardNumber, errorElementName) => {
    let isValid = true;
    let errorMessage = null;
    let cardNumberRegExp = null; // REDACTED

    // Check a range of conditions to determine the validity of the input
    // If statement structured so that the first error message "wins" and is displayed to the user
    if (typeof cardNumber !== "string") {
        isValid = false;
        errorMessage = "Invalid input format!"
    }
    else if (cardNumber === null || cardNumber === " " || cardNumber === "") {
        isValid = false;
        errorMessage = "Card number cannot be blank!"
    }/*     
    else if (cardNumberRegExp.test(cardNumber) === false) {
        isValid = false;
        errorMessage = "Invalid card number! Ensure card number is 16 digits long and starts with a 5 followed by either 1/2/3/4/5."
    }*/

    // Only display an error message if a message has been assigned and input is not valid
    if (isValid === false && errorMessage != null) {
        // Display the error message to the user
        document.getElementById(errorElementName).innerHTML = errorMessage;
    }
    else {
        // Remove the error message once the issue has been corrected
        document.getElementById(errorElementName).innerHTML = "";
    }

    return isValid;
}

const validateExpiryDate = (expiryMonth, expiryYear, errorElement) => {
    let isValid = true;
    let errorMessage = null;

    // Capture the current month and year for validation comparisons
    const dateToday = new Date();
    const dateTodayMonth = dateToday.getMonth() + 1;
    const dateTodayYear = dateToday.getFullYear();

    if (parseInt(expiryMonth) === -1 && parseInt(expiryYear) === -1) {
        // -1 is a blank value, since that is the value assigned to the placeholder items
        isValid = false;
        errorMessage = "Please enter a month and year!"
    }
    else if (parseInt(expiryMonth) === -1) {
        isValid = false;
        errorMessage = "Please enter a month!"
    }
    else if (parseInt(expiryYear) === -1) {
        isValid = false;
        errorMessage = "Please enter a year!"
    }
    else if (parseInt(expiryMonth) > 12) {
        // Do not allow a month value greater than 12
        isValid = false;
        errorMessage = "Invalid month!"
    }
    else if ( (parseInt(expiryMonth) < dateTodayMonth && parseInt(expiryYear) === dateTodayYear )|| parseInt(expiryYear) < dateTodayYear ) {
        // Only validate the month if the input year matches the current year
        isValid = false;
        errorMessage = "Your credit card has expired!"
    }

    if (isValid === false && errorMessage != null) {
        document.getElementById(errorElement).innerHTML = errorMessage;
    }
    else {
        document.getElementById(errorElement).innerHTML = "";
    }

    return isValid;
}

const validateCvvCode = (cvvCode, errorElementName) => {
    let isValid = true;
    let errorMessage = null;
    let cvvCodeRegExp; // REDACTED

    if (typeof cvvCode !== "string") {
        isValid = false;
        errorMessage = "Invalid input format!"
    }
    else if (cvvCode === null || cvvCode === " " || cvvCode === "") {
        isValid = false;
        errorMessage = "CVV code cannot be blank!"
    } /*     
    else if (cvvCodeRegExp.test(cvvCode) === false) {
        isValid = false;
        errorMessage = "Invalid CVV code! Ensure CVV code contains only numbers with minimum length 3 and max length 4."
    }*/

    if (isValid === false && errorMessage != null) {
        document.getElementById(errorElementName).innerHTML = errorMessage;
    }
    else {
        document.getElementById(errorElementName).innerHTML = "";
    }

    return isValid;
}

// Add event listener after relevant functions have been initialised first
document.getElementById("submit-button").addEventListener("click" , processPaymentForm);

const sendPostRequest = () => {
    const serverUrl = " "; // REDACTED 
    // Convert all data to their relevant format
    const dataToSend = {
        // REDACTED
    }
    fetch(serverUrl, {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    .then((response) => {
        if (response.status === 200){
            return response.json();
        }
        else if (response.status === 400) {
            // Handle status 400 coming back from the server
            throw "Bad request was sent to the server.";
        }
        else {
            throw "An unexpected error has occured."
        }
    })
    .then((resJson) => {
        // Capture and send the response message from server along with inputted cardnumber
        processSuccess(resJson["message"], cardNumber);
    })
    .catch((error) => {
        // Capture and send the error to relevant function
        processFailure(error, "server-error");
    })
}

// Pass the relevant information onto the sucess page
const processSuccess = (serverResponse, cardNumber) => {
    // Reset the cursor
    document.body.style.cursor = "default";
    location.href = "success.html?cardNumber="+cardNumber+"&response="+serverResponse;
}

// Update the form with error message and do not proceed to success page
const processFailure = (errorMessage, errorElement) => {
    // Reset the cursor
    document.body.style.cursor = "default";
    document.getElementById(errorElement).innerHTML = errorMessage + " Please check your input and try again!";
}